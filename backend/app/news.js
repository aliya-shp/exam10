const express = require('express');

const newsDB = require('../newsDB');

const router = express.Router();

router.get('/', async (req, res) => {
    // const news = await newsDB.getConnection().query
    res.send('OK');
});