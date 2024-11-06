// routes/user.routes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controllers');
const { verifyToken, isAdmin, isUserOrAdmin } = require('../middleWare/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The hashed password of the user
 *         role:
 *           type: string
 *           description: The role of the user (user or admin)
 *         address:
 *           type: string
 *           description: The address of the user
 *         phoneNumber:
 *           type: number
 *           description: The phone number of the user
 *       example:
 *         id: 1
 *         username: JohnDoe
 *         email: 9gHrN@example.com
 *         password: password123
 *         role: user
 *         address: 123 Main St
 *         phoneNumber: 1234567890
 */

// Update user profile (accessible by user or admin)
/**
 * @swagger
 * /api/users/update/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               address:   
 *                 type: string
 *                 description: The address of the user 
 *               phoneNumber:
 *                 type: number
 *                 description: The phone number of the user
 *             example:
 *               username: JohnDoe
 *               email: 9gHrN@example.com   
 *               password: password123
 *               address: 123 Main St   
 *               phoneNumber: 1234567890
 */
router.put('/update/:id', verifyToken, isUserOrAdmin, UserController.updateUser);

// Delete user (admin only)
/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: User ID is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */
router.delete('/delete/:id', verifyToken, isAdmin, UserController.deleteUser);

// Get all users (admin only)
/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/all', verifyToken, isAdmin, UserController.getAllUsers);

// Get user by ID
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to get user
 * */
router.get('/:id', verifyToken, isUserOrAdmin, UserController.getUsersByID);

module.exports = router;