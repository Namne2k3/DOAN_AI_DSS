const User = require('../models/User')

const getUser = async (req, res) => {
    try {
        const findUser = await User.findById(req.params.id);
        res.status(200).json(findUser)
    } catch (err) {
        res.status(500).json(err)
    }
}
const getUserByEmail = async (req, res) => {
    try {
        const findUserByEmail = await User.find({ email: req.params.email })
        res.status(200).json(findUserByEmail)
    } catch (error) {
        res.status(500).json(err)
    }
}


module.exports = {
    getUser,
    getUserByEmail
}