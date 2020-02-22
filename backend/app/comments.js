const express = require('express');
const newsDB = require('../newsDB');

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('OK');
    res.send('OK')
});

module.exports = router;