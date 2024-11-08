const mongoose = require('mongoose');

const DonateSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateReceived: { type: Date},
    amount: { type: Number },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    orderCode: { type: String, required: true },
});

const Donate = mongoose.model('Donate', DonateSchema);
module.exports = Donate;