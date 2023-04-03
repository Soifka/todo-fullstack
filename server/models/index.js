const mongoose = require('mongoose');
const User = require('./User');
const Task = require('./Task');
const RefreshToken = require('./RefreshToken');
const DB_CONFIG = require('../configs/db');
const env = process.env.NODE_ENV || 'development';

const dbConfig = env === 'development' ? DB_CONFIG.development : env === 'test' ? DB_CONFIG.test : env === 'production' ? DB_CONFIG : null;

mongoose.connect(dbConfig.DB)
.catch(err => {
    console.log('Connect failed');
    process.exit(1); // "положили" сервер (процесс node) с кодом 1 (нет смысла серверу работать без соединения с БД)
});

module.exports = {
    User,
    Task,
    RefreshToken
};