const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://localhost:27017/examen', (err, database) => {
    if (err) return console.log(err);
    db = database.db('examen');
    app.listen(process.env.PORT || 3000, () => {
        console.log('listening on port 3000')
    })
})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/aanvraag');
});

app.get('/aanvraag', (req, res) => {
    res.render('aanvraag.ejs', {});
});

app.post('/aanvraag', (req, res) => {
    db.collections('inhaal').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);

    })
})