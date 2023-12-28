const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authRegister = async (req, res) => {
    try {
        const { username, password, email } = req.body
        // process hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(200).json(savedUser)

    } catch (err) {
        res.status(500).json({ message: "Email already existed!" })
    }
}

const authLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "Email not found!" });
        }

        if (!user.verified) {
            return res.status(404).json({ message: "Email not verified" });
        }

        const match = await bcrypt.compareSync(req.body.password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Wrong password!" });
        }

        // authenticate user
        const token = jwt.sign({ id: user._id, email: user.email, password: user.password, username: user.username }, process.env.SECRET, { expiresIn: '3d' });
        const { password, ...info } = user._doc;

        res.cookie("token", token, { sameSite: 'None', secure: true }).status(200).json(info);
        res.end();


    } catch (err) {
        res.status(500).json(err);
    }
}

const authLogout = async (req, res) => {
    try {
        res.clearCookie("token").status(200).json({ err: 0, message: "logged out" })
    } catch (err) {
        res.status(500).json(err);
    }
}

const authRefetch = async (req, res) => {
    const token = req?.cookies?.token;
    jwt.verify(token, process.env.SECRET, {}, async (err, decoded) => {
        if (err) {
            return res.status(404).json(err)
        }
        res.status(200).json(decoded)
    })
}

module.exports = {
    authRegister,
    authRefetch,
    authLogin,
    authLogout
}