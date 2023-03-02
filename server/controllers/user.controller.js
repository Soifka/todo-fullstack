const { User } = require('../models/index');
const bcrypt = require('bcrypt');

module.exports.registrationUser = async(req, res, next) => {
    try {
        const { body, passwordHash } = req;
        const createdUser = await User.create({...body, passwordHash});
        return res.status(201).send({data: createdUser});
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
            // check compare result!!!
            console.log(result)

            if(result) {
                return res.status(200).send({data: foundUser});
            } else {
                return res.status(400).send({error: 'Wrong password or email'})
            }
        }
    } catch (error) {
        next(error);
    }
};