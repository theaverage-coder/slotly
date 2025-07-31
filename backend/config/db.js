require('dotenv').config();
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://pateleesha6:Calico7@slotlycluster.axhm1p8.mongodb.net/?retryWrites=true&w=majority&appName=SlotlyCluster')

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB