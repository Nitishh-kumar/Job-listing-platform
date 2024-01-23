const express = require('express');
const router = express.Router();
const jwtVerify=require('../middlewares/authMiddleware');

const { createJob } = require('../controllers/Job');

router.post('/createJob',jwtVerify, createJob);

module.exports = router;