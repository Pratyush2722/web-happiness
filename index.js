// Importing required modules
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Initializing the Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Setting up the view engine
app.set('view engine', 'ejs');
// Route to display the index page
app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) {
            return res.status(500).send('Error reading files');
        }
        res.render('index', { files: files });
    });
});
app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
      res.render('show',{filename:req.params.filename,filedata:filedata});
    });
});

app.get('/edit/:filename', (req, res) => {
    res.render('edit',{filename:req.params.filename});
});
app.post('/edit', function(req, res){
     fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
       res.redirect('/');
     });
});

// Route to create a new file
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('').txt}`, req.body.details, (err) => {
        if (err) {
            return res.status(500).send('Error writing file');
        }
        res.redirect('/');
    });
});

// Starting the server
app.listen(3000);
