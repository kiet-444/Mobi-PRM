const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect successfully')
    } catch (error) {
        console.error('Connect failure')
        process.exit(1);
    }
}

module.exports = { connectDB }