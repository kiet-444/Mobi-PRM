// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    // If no token is provided, respond with an error
    if (!token) return res.status(401).json({ message: 'No token provided' });

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate token' });

        // Attach user ID and role to the request object for use in other routes
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next(); // Proceed to the next middleware or route handler
    });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    // Check if the user's role is 'admin'
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next(); // Proceed to the next middleware or route handler
};

// Middleware to check if the user is either the user making the request or an admin
const isUserOrAdmin = (req, res, next) => {
    // Check if the user is an admin or if the user ID matches the requested user ID
    if (req.userRole !== 'admin' && req.userId !== req.params.id) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next(); // Proceed to the next middleware or route handler
};

module.exports = { verifyToken, isAdmin, isUserOrAdmin };
