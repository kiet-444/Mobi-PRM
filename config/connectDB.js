const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            
        })
        console.log('Connect successfully')
    } catch (error) {
        console.error('Connect failure')
        process.exit(1);
    }
}

module.exports = { connectDB }