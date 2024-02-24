const router = require('express').Router();
const authRoutes = require('./auth/authRoutes');

router.use('/auth', authRoutes);

module.exports = router;
