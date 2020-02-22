const express = require('express');
const newsDB = require('../newsDB');

const router = express.Router();

router.get('/', async (req, res) => {
    const comment = req.query;

    if (comment.news_id) {
        const comments = await newsDB.getConnection().query('SELECT `news_id` = ? FROM `comments`', comment.news_id);
        res.send(comments);
    } else {
        const comments = await newsDB.getConnection().query('SELECT * FROM `comments`');
        res.send(comments);
    }
});

router.post('/', async (req, res) => {
    const comment = req.body;

    if (comment.news_id) {
        const result = await newsDB.getConnection().query(
            'INSERT INTO `comments` (`news_id`, `author`, `text`), ' +
            ' VALUES (?, ?, ?)',
            [comment.news_id, comment.author, comment.text]
        );
        comment.id = result.insertId;
        res.send(comment);
    } else {
        res.send({message: 'There is no such news'});
    }
});

router.delete('/:id', async (req, res) => {
    const comments = await newsDB.getConnection().query('SELECT * FROM `comments` WHERE `id` = ?', req.params.id);

    if (comments.length === 0) {
        res.status(400).send({message: 'No such comment!'});
    } else {
        newsDB.getConnection().query('DELETE FROM `comments` WHERE `id` = ?', req.params.id);
        res.send({message: 'Deleted comment successfully'});
    }
});

module.exports = router;