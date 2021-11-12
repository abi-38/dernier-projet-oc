const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', multer, userCtrl.signup); 
router.post('/login', userCtrl.login);

router.get('/me', auth, multer, userCtrl.getUser);
router.delete('/:id', auth, multer, userCtrl.deleteUser);

module.exports = router;