const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post');


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());//express.json plus de bodyparser
app.use('/api/post', postRoutes);


module.exports = app;