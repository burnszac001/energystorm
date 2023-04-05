const express = require('express');

const { trackerGet, trackerPost } = require('./tracker-controller');

const router = express.Router();

router.get('/', trackerGet);
router.post('/', trackerPost);

module.exports = router;