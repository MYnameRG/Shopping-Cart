const mongoose = require("mongoose");

const MongoDB_URI = 'mongodb+srv://rohitgupta:rohitgupta@cluster0.vsjaz.mongodb.net/shop?retryWrites=true&w=majority';
const connectDB = async () => {
    try {
        await mongoose.connect(MongoDB_URI);
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = connectDB;