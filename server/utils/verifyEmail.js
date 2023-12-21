const nodemailer = require('nodemailer')
const User = require('../models/User')
const confirmEmail = async (req, res) => {
    try {
        const { userId } = req.params
        await User.findByIdAndUpdate(userId, { verified: true })
        res.send("Email Verified!")
    } catch (err) {
        res.status(500).json(err)
    }
}

const link = `http://localhost:5000/api/auth/confirm`
const verifyEmail = async (req, res) => {

    const { email, _id } = req.body;

    try {
        let config = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        }

        let transporter = nodemailer.createTransport(config)

        let message = {
            from: process.env.EMAIL,
            to: email,
            subject: 'You just sign up NPT Weather task',
            html: `
                <div>
                    <a href=${link + '/' + _id}>Click here to verify your email!</a>
                </div>
            `
        }

        const response = await transporter.sendMail(message)

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json(error)
    }
}
// prlb zfew gcka vxfq
module.exports = { verifyEmail, confirmEmail }