const { Task } = require('../models/index');

module.exports.createTask = async(req, res, next) => {
    try {
        const { body } = req;
        const createdTask = await Task.create(body);
        return res.status(201).send({data: createdTask});
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUserTasks = async(req, res, next) => {
    try {
        const { params: { userId } } = req;
        const userTasks = await Task.find({
            authorId: userId
        });
        return res.status(200).send({data: userTasks});
    } catch (error) {
        next(error);
    }
}

module.exports.deleteTask = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}