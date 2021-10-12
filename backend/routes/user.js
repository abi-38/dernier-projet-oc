const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', multer, userCtrl.signup); // vérifier que multer est ok car photo de profil
router.post('/login', multer, userCtrl.login);

module.exports = router;