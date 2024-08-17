const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// setup middleware to public folder
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});