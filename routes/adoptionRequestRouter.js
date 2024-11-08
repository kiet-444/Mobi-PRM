const express = require('express');
const router = express.Router();
const AdoptionRequestController = require('../controllers/AdoptionRequest.controllers');
const { verifyToken, isAdmin } = require('../middleWare/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     AdoptionRequest:
 *       type: object
 *       required:
 *         - petId
 *         - name
 *         - address
 *         - phoneNumber
 *         - cccd
 *         - userId
 *       properties:
 *         petId:
 *           type: string
 *           description: ID of the pet being adopted
 *         name:
 *           type: string
 *           description: Name of the adopter
 *         address:
 *           type: string
 *           description: Address of the adopter
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the adopter
 *         cccd:
 *           type: string
 *           description: National ID number (CCCD)
 *         status:
 *           type: string
 *           description: Status of the adoption request
 *           enum: ['pending', 'approved', 'rejected']
 */

/**
 * @swagger
 * /adoption-request:
 *   post:
 *     summary: Create a new adoption request
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
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   $ref: '#/components/schemas/AdoptionRequest'
 *       500:
 *         description: Failed to create adoption request
 */
router.post('/adoption-request', verifyToken, AdoptionRequestController.createAdoptionRequest);

/**
 * @swagger
 * /adoption-request:
 *   get:
 *     summary: Retrieve all adoption requests
 *     tags: [AdoptionRequest]
 *     responses:
 *       200:
 *         description: Successfully retrieved adoption requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AdoptionRequest'
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Failed to retrieve adoption requests
 */
router.get('/adoption-request', verifyToken, AdoptionRequestController.getAllAdoptionRequest);

/**
 * @swagger
 * /adoption-request:
 *   patch:
 *     summary: Update the status of an adoption request
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
 *                 description: ID of the adoption request to update
 *               status:
 *                 type: string
 *                 description: New status for the adoption request
 *                 enum: ['pending', 'approved', 'rejected']
 *     responses:
 *       200:
 *         description: Successfully updated the adoption request status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   $ref: '#/components/schemas/AdoptionRequest'
 *       500:
 *         description: Failed to update the adoption request status
 */
router.patch('/adoption-request', verifyToken, isAdmin, AdoptionRequestController.updateStatusAdoptionRequest);

module.exports = router;