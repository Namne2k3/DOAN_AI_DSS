const taskRouter = require('../routes/tasks')
const authRouter = require('../routes/auth')
const userRouter = require('../routes/user')
const configRoutes = (app) => {
    app.use('/api/tasks', taskRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter)
}

module.exports = configRoutes;