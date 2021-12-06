const express = require('express');

const auth = require('../middleware/auth');
const adminChecker = require('../middleware/adminChecker');
const multer = require('../middleware/multer-config');

const router = express.Router();
const postCtrl = require('../controllers/post');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.findAllPost);
router.get('/:id', auth, postCtrl.findOnePost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, adminChecker, multer, postCtrl.deletePost);

module.exports = router;