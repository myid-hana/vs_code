const express = require('express');
const bodyPaser = require('body-parser');
const fs = require('fs');

let app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true;

app.use(express.static('public'));
app.use(bodyPaser.urlencoded({
    extended: false
}));

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, filelist) => {
        res.render('form_file', {
            _filelists: filelist,
            _fileLength: filelist.length
        });
    });
});
app.get('/topic/:id', (req, res) => {
    let id = req.params.id;
    //console.log(id);
    fs.readdir('data', (err, filelist) => {
        fs.readFile('data/' + id, {
            encoding: 'utf-8'
        }, (err, filecontent) => {
            res.render('form_file', {
                _filecontent: filecontent,
                _filelists: filelist,
                _fileLength: filelist.length,
            })
        });
    });
});
app.post('/topic', (req, res) => {
    let title = req.body.title;
    let desc = req.body.desc;

    fs.writeFile('data/' + title, desc, (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        res.statusCode = 302;
        res.setHeader('Location', '/topic/new');
        res.end();
    });
});

app.listen(3000, () => {
    console.log('connected 3000 port');
});