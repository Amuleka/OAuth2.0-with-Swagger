const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/project', require('./project'));

module.exports = router;
