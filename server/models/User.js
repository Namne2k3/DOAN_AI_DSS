const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })
// options timeStamps
// Mongoose sẽ thêm 2 thuộc tính loại Date vào Schema, và createAt

module.exports = mongoose.model['User'] || mongoose.model('User', UserSchema);