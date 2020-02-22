const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const newsDB = require('./newsDB');
const news = require('./app/news');
const comments = require('./app/comments');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.use('/news', news);
app.use('/comments', comments);

const run = async () => {
    await newsDB.connect();

    app.listen(port, () => {
        console.log(`Server has started working on ${port} port`);
    });

    process.on('exit', () => {
        newsDB.disconnect();
    });
};

run().catch(e => {
    console.error(e);
});

