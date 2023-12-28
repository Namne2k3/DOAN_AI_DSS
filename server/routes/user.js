const express = require('express')
const userRouter = express.Router();
const { getUser, getUserByEmail } = require('../controllers/userController')

userRouter.get('/:id', getUser)
userRouter.get('/email/:email', getUserByEmail)

module.exports = userRouter;