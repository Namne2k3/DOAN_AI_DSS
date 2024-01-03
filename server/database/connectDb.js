const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database is connected successfully!');
    } catch (err) {
        console.log("Check error connect to db >>> ", err);
    }
}

module.exports = connectDb