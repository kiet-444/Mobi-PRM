const express = require('express');
const router = express.Router();
const AdoptionRequestController = require('../controllers/AdoptionRequest.controllers');
const { verifyToken, isAdmin } = require('../middleWare/auth.middleware');



// Create new adoption request

/**
 * @swagger
 * /api/adoption-request:
 *   post:
 *     summary: Create new adoption request
 *     tags: [AdoptionRequest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdoptionRequest'
 *     responses:
 *       201:
 *         description: Adoption request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdoptionRequest'
 *       500:
 *         description: Failed to create adoption request
 * 
 */
router.post('/adoption-request', verifyToken, AdoptionRequestController.createAdoptionRequest);

// Get adoption requests
router.get('/adoption-request', verifyToken, AdoptionRequestController.getAllAdoptionRequest);

// Update status adoption request

/**
 * @swagger
 * /api/adoption-request:
 *   patch:
 *     summary: Update status adoption request
 *     tags: [AdoptionRequest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the adoption request to update
 *               status:
 *                 type: string
 *                 description: The new status of the adoption request
 *             example:
 *               id: "adoption-request-id"
 *               status: "accepted"
 *     responses:
 *       200:
 *         description: Adoption request status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 */
router.patch('/adoption-request', verifyToken, AdoptionRequestController.updateStatusAdoptionRequest);

module.exports = router;