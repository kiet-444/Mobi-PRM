const express = require('express');
const router = express.Router();
const DonateController = require('../controllers/Donate.controllers');
const { verifyToken, isAdmin } = require('../middleWare/auth.middleware');

router.post('/donate', verifyToken, DonateController.addDonate);

router.get('/donate', verifyToken, DonateController.getDonates);

module.exports = router;