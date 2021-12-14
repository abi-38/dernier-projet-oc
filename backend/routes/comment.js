const express = require('express');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();
const postCtrl = require('../controllers/comment');

router.post('/:id/comments', auth, multer, postCtrl.createComment);
router.get('/:id/comments', auth, postCtrl.findAllComment);
router.delete('/:id/comments/:commentId', auth, multer, postCtrl.deleteComment);

module.exports = router;