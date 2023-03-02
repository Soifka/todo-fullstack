const { User } = require('../models/index');
const bcrypt = require('bcrypt');

module.exports.registrationUser = async(req, res, next) => {
    try {
        const { body, passwordHash } = req;
        const createdUser = await User.create({...body, passwordHash});
        return res.status(201).send(createdUser);
        // error???
    } catch (error) {
        next(error);
    }
};

module.exports.loginUser = async(req, res, next) => {
    try {
        const { body, passwordHash } = req;
        const foundUser = await User.findOne({
            email: body.email
        });
        if(foundUser) {
            const result = await bcrypt.compare(passwordHash, foundUser.passwordHash);
            res.status(200).send('Logged in');
        }
    } catch (error) {
        next(error);
    }
};