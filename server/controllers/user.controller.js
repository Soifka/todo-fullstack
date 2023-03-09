const { User, RefreshToken } = require('../models/index');
const bcrypt = require('bcrypt');
const NotFoundError = require('../errors/NotFound');
const { createAccessToken, verifyAccessToken, createRefreshToken, verifyRefreshToken } = require('../services/tokenService');
const RefreshTokenError = require('../errors/RefreshTokenError');

module.exports.registrationUser = async(req, res, next) => {
    try {
        const { body, passwordHash } = req;
        const createdUser = await User.create({...body, passwordHash});
        const accessToken = await createAccessToken({userId: createdUser._id, email: createdUser.email});
        return res.status(201).send({data: createdUser, tokens: {accessToken}});
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
        next(new RefreshTokenError('Invalid refresh token'));
    }
    
    try {
        if(verifyResult) {
            const foundUser = await User.findOne({email: verifyResult.email});
            const rtFromDB = await RefreshToken.findOne({$and: [{token: refreshToken}, {userId: foundUser._id}]})
            if(rtFromDB) {
                const removeResult = await rtFromDB.remove();
                const newAccessToken = await createAccessToken({userId: foundUser._id, email: foundUser.email});
                const newRefreshToken = await createRefreshToken({userId: foundUser._id, email: foundUser.email});
                const addedToken = await RefreshToken.create({
                    userId: foundUser._id,
                    token: newRefreshToken
                })
            }
            
            return res.status(200).send({tokens: {
                accessToken: newAccessToken, 
                refreshToken: newRefreshToken
            }})
        } else {
            return res.status(401).send({error: 'Invalid token'});
        }
    } catch (error) {
        next(error);
    }
}