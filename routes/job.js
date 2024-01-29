const express = require('express');
const router = express.Router();
const jwtVerify=require('../middlewares/authMiddleware');

const { createJob,editJob,job_description,allJob,deleteJob} = require('../controllers/Job');

router.post('/createJob',jwtVerify, createJob);
router.post('/editJob/:jobId',jwtVerify, editJob);
router.get('/description/:jobId',job_description);
router.get('/allJob',allJob);
router.delete('/job/:jobId',deleteJob);

module.exports = router;