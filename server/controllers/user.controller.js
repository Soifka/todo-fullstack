const { User } = require('../models/index');

module.exports.registrationUser = async(req, res, next) => {
    try {
        const { body } = req;
        const createdUser = await User.create(body);
        return res.status(201).send(createdUser);
        // error???
    } catch (error) {
        next(error);
    }
};

module.exports.loginUser = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
};