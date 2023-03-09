const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const NotFoundError = require('../errors/NotFound');
const { createToken, verifyToken } = require('../services/tokenService');

module.exports.registrationUser = async(req, res, next) => {
    try {
        const { body, passwordHash } = req;
        const createdUser = await User.create({...body, passwordHash});
        return res.status(201).send({data: createdUser, tokens: {token}});
        // error???
    } catch (error) {
        next(error);
    }
};

module.exports.loginUser = async(req, res, next) => {
    try {
        const { body } = req;
        const foundUser = await User.findOne({
            email: body.email
        });
        if(foundUser) {
            const result = await bcrypt.compare(body.password, foundUser.passwordHash);
            if(!result) {
                throw new NotFoundError('Wrong password');
            }
            const token = await createToken({userId: foundUser._id, email: foundUser.email});
            //console.log(token);
            return res.status(200).send({data: foundUser, tokens: {token}});
        } else {
            throw new NotFoundError('Wrong email');
        }
    } catch (error) {
        next(error);
    }
};

module.exports.checkAuth = async(req, res, next) => {
    try {
        const { tokenPayload: { email } } = req;
        
        const foundUser = await User.findOne({
            email
        });
        return res.status(200).send({data: foundUser});
    } catch (error) {
        next(error);
    }
};