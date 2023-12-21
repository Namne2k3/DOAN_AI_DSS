const User = require('../models/User')

const getUser = async (req, res) => {
    try {
        const findUser = await User.findById(req.params.id);
        res.status(200).json(findUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    getUser
}