const { Router } = require('express'); // можно и без скобок рекваерить???
const userRouter = require('./user');

const router = Router();

router.use('/user', userRouter);
//router.use('/task')

module.exports = router;