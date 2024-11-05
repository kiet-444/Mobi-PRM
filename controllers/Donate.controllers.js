const Fund = require('../models/Fund');
const PayOS = require('@payos/node');
const dotenv = require('dotenv');
dotenv.config();
const payos = new PayOS(process.env.PAYOS_API_KEY, 
    process.env.PAYOS_API_SECRET, 
    process.env.PAYOS_ENVIRONMENT
);

const addDonate = async (req, res) => {  
    try {
        const { amount } = req.body;
        const orderCode = Math.floor(Math.random() * 1000000000);
        const order = {
            amount,
            orderCode,
            description: `Payment for order ${orderCode}`,
            returnUrl: "",
            cancelUrl: "",
        };

        const newDonate = new Donate({
            user: req.userId,
            orderCode,
            amount,
            dataReceived: new Date(),
        });

        await newDonate.save();

        const paymentLink = await payos.createPaymentLink(order);
        res.json({ checkoutUrl: paymentLink.checkoutUrl });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add fund', error });
    }
}

const getDonates = async (req, res) => {
    try {
        const donates = await Donate.find().populate('user', 'name');
        const totalAmount = donates.reduce((acc, donate) => acc + (donate.amount || 0), 0);
        res.status(200).json({ data: {donates, totalAmount}, message: 'donates retrieved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get donates', error });
    }
}

module.exports = {
    addDonate, getDonates
}