const express = require('express');

const auth = require('../middleware/auth');
const adminChecker = require('../middleware/adminChecker');
const multer = require('../middleware/multer-config');

const router = express.Router();
const postCtrl = require('../controllers/comment');

router.post('/:id/comments', auth, multer, postCtrl.createComment);
router.get('/:id/comments', auth, postCtrl.findAllComment);
//router.get('/:id', auth, postCtrl.findOneComment);
//router.put('/:id', auth, multer, postCtrl.updateComment);
router.delete('/:id/comments/:commentId', auth, adminChecker, multer, postCtrl.deleteComment);

module.exports = router;