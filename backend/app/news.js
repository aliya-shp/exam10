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

    if (req.file) {
        news.image = req.file.filename;
    }

    const result = await newsDB.getConnection().query(
        'INSERT INTO `news` (`title`, `text`, `image`, `datetime`) VALUES ' +
        '(?, ?, ?, ?)',
        [news.title, news.text, news.image, news.datetime]
    );

    if (Object.values(news).length < 4) {
        return res.status(400).send({message: 'You forgot to fill all the fields!'});
    }

    news.id = result.insertId;

    res.send(news);
});

// router.post('/', upload.single('image'), async (req, res) => {
//     const news = req.body;
//
//     console.log(news);
//
//     if (req.file) {
//         news.image = req.file.filename;
//     }
//
//     console.log(news.image);
//
//     const result = await newsDB.getConnection().query(
//         'INSERT INTO `news` (`title`, `text`, `image`, `datetime`) ' +
//         '(?, ?, ?, ?)',
//         [news.title, news.text, news.image, news.datetime]
//     );
//
//     news.id = result.insertId;
//
//     res.send(news);
// });

router.get('/:id', async (req, res) => {
    const news = await newsDB.getConnection().query('SELECT * FROM `news` WHERE `id` = ?', req.params.id);

    const newsItem = news[0];
    if (!newsItem) {
        return res.status(404).send({message: 'Was not found'});
    }

    res.send(news);
});

router.delete('/:id', async (req,res) => {
    const news = await newsDB.getConnection().query('SELECT * FROM `news` WHERE `id` = ?', req.params.id);

    if (news.length === 0) {
        res.status(400).send({message: 'No such news!'});
    } else {
        newsDB.getConnection().query('DELETE FROM `news` WHERE `id` = ?', req.params.id);
        res.send({message: 'Deleted news successfully'});
    }
});

module.exports = router;