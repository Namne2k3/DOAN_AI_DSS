const express = require('express')
const router = express.Router();
const { authRegister, authRefetch, authLogin, authLogout } = require('../controllers/authController')
const { verifyEmail, confirmEmail } = require('../utils/verifyEmail')

// Default
router.get('/', (req, res) => {
    res.status(200).json("Server is running")
})
router.post('/logout', authLogout)

router.post('/register', authRegister)

router.post('/verify', verifyEmail)
router.put('/confirm/:userId', confirmEmail)

router.get('/refetch', authRefetch)

router.post('/login', authLogin)

module.exports = router;