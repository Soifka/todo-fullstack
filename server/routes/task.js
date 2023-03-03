const { Router } = require('express');
const TaskController = require('../controllers/task.controller');

const taskRouter = Router();

taskRouter.post('/', TaskController.createTask);
taskRouter.get('/:userId', TaskController.getAllUserTasks);


module.exports = taskRouter;