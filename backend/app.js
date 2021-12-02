const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();
app.use(helmet()); // utilisation de helmet pour la sécurité

// accès cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// connexion à la bdd
const db = require("./models");

db.sequelize.sync({ alter: process.env.APP_ENV === "dev" }).then(() => {
    console.log("connexion à la bdd ok !");
  }).catch(e => console.error(e));

app.use(express.json()); //express.json plus de bodyparser

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;