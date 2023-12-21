const taskRouter = require('../routes/tasks')
const authRouter = require('../routes/auth')
const configRoutes = (app) => {
    app.use('/api/tasks', taskRouter);
    app.use('/api/auth', authRouter);
}

module.exports = configRoutes;