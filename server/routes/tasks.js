const express = require('express')
const taskRouter = express.Router();
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask, getTasksDesc, getUserPost } = require('../controllers/taskController')

// create 
taskRouter.post('/create', createTask);

// get
taskRouter.get('/', getAllTasks)
taskRouter.get('/important', getTasksDesc)
taskRouter.get('/:id', getTaskById)
taskRouter.get('/user/:userId', getUserPost)

// update
taskRouter.put('/update/:id', updateTask)

// delete
taskRouter.delete('/:id', deleteTask)

module.exports = taskRouter;