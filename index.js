const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { connectDB } = require('./config/connectDB');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const MediaRoute = require('./routes/mediaRouter');
const PetRoute = require('./routes/petRouter');
const NewsRoute = require('./routes/newsRouter');
const AuthRoute = require('./routes/authRouter');
const UserRoute = require('./routes/userRouter');
const AdoptionRequestRoute = require('./routes/adoptionRequestRouter');
const CartPetRoute = require('./routes/cartPetRouter');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const YOUR_DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

// Middleware setup
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(upload.any());

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.css";
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCssUrl: CSS_URL,
}));

// Define routes
app.use('/api', MediaRoute);
app.use('/api/pets', PetRoute);
app.use('/api/news', NewsRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/users', UserRoute);
app.use('/api/request', AdoptionRequestRoute);
app.use('/api/cart-pets', CartPetRoute);

// Connect to MongoDB
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Server setup
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
});

// Global error handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
