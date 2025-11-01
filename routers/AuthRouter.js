// routes/authRoutes.js
const express = require('express');
const AuthService = require('../services/authService');

const router = express.Router();
const authService = new AuthService();

// map routes to methods
router.post('/register', (req, res) => authService.createUser(req, res));
router.post('/verify', (req, res) => authService.verify(req, res));

module.exports = router;
