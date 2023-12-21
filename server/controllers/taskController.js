const Task = require('../models/Task')

const getTasksDesc = async (req, res) => {
    try {
        const searchFilter = {
            title: { $regex: req.query.search, $options: "i" }
        }
        const tasks = await Task.find(req.query.search && searchFilter).sort({ priority: 'desc' });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete Successfully");
    } catch (err) {
        res.status(500).json(err)
    }
}

const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json(err)
    }
}

const getTaskById = async (req, res) => {
    try {
        const searchFilter = {
            title: { $regex: req.query.search, $options: "i" }
        }

        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json(err)
    }
}

const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();

        res.status(200).json(savedTask);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getAllTasks = async (req, res) => {
    try {
        const searchFilter = {
            title: { $regex: req.query.search, $options: "i" }
        }

        const tasks = await Task.find(req.query.search && searchFilter);
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json(err);
    }
}

const getUserPost = async (req, res) => {
    try {
        const findUserTask = await Task.find({ userId: req.params.userId })
        res.status(200).json(findUserTask);
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTasksDesc,
    getUserPost
}