const { User, RefreshToken } = require('../models/index');
const bcrypt = require('bcrypt');
const NotFoundError = require('../errors/NotFound');
const RefreshTokenError = require('../errors/RefreshTokenError');
const { createAccessToken, verifyAccessToken, createRefreshToken, verifyRefreshToken } = require('../services/tokenService');

module.exports.registrationUser = async(req, res, next) => {
    try {
        const { body, passwordHash } = req;
        const createdUser = await User.create({...body, passwordHash});
        const accessToken = await createAccessToken({userId: createdUser._id, email: createdUser.email});
        const refreshToken = await createRefreshToken({userId: createdUser._id, email: createdUser.email});
        return res.status(201).send({data: createdUser, tokens: {accessToken, refreshToken}});
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
            const accessToken = await createAccessToken({userId: foundUser._id, email: foundUser.email});
            const refreshToken = await createRefreshToken({userId: foundUser._id, email: foundUser.email});
            
            const addedToken = await RefreshToken.create({
                userId: foundUser._id,
                token: refreshToken
            });

            return res.status(200).send({data: foundUser, tokens: {accessToken, refreshToken}});
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

module.exports.refreshSession = async(req, res, next) => {
    const { body: { refreshToken } } = req;
    let verifyResult = await verifyRefreshToken(refreshToken);
    try {
        verifyResult = await verifyRefreshToken(refreshToken);
    } catch (error) {
        const newError = new RefreshTokenError('Invalid refresh token');
        return next(newError); 
    }
    
    try {
        if(verifyResult) {
            const foundUser = await User.findOne({email: verifyResult.email});
            const rtFromDB = await RefreshToken.findOne({$and: [{token: refreshToken}, {userId: foundUser._id}]})
            if(rtFromDB) {
                //const deleteResult = await RefreshToken.deleteOne(rtFromDB);
                const deleteResult = await RefreshToken.deleteOne({$and: [{token: refreshToken}, {userId: foundUser._id}]});
                const newAccessToken = await createAccessToken({userId: foundUser._id, email: foundUser.email});
                const newRefreshToken = await createRefreshToken({userId: foundUser._id, email: foundUser.email});
                const addedToken = await RefreshToken.create({
                    userId: foundUser._id,
                    token: newRefreshToken
                })
                return res.status(200).send({tokens: {
                    accessToken: newAccessToken, 
                    refreshToken: newRefreshToken
                }})
            }
        } else {
            throw new RefreshTokenError('Token not found');
        }
    } catch (error) {
        next(error);
    }
}