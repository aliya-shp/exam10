const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const newsDB = require('../newsDB');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const news = await newsDB.getConnection().query('SELECT `id`, `title`, `image`, `datetime` FROM `news`');
    res.send(news);
});

router.post('/', upload.single('image'), async (req, res) => {
    const news = req.body;

    console.log(news);

    if (req.file) {
        news.image = req.file.filename;
    }

    console.log(news.image);

    const result = await newsDB.getConnection().query(
        'INSERT INTO `news` (`title`, `text`, `image`, `datetime`) ' +
        '(?, ?, ?, ?)',
        [news.title, news.text, news.image, news.datetime]
    );

    news.id = result.insertId;

    res.send(news);
});

router.get('/:id', async (req, res) => {

});

module.exports = router;