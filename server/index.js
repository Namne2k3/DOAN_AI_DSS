const express = require('express')
const app = express();
const configApp = require('./config/appConfig')
const connectDb = require('./database/connectDb')
const configRoute = require('./config/configRoutes')
const taskRouter = require('./routes/tasks')
const authRouter = require('./routes/auth')
require('dotenv').config();

configApp(app);
app.use('/api/tasks', taskRouter);
app.use('/api/auth', authRouter);

app.listen(5000, async () => {
    await connectDb();
    console.log('App is running on port', 5000)
})