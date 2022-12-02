const express = require('express');
const formidable = require('express-formidable');

const router = express.Router();

// middleware
const { requireSignin, canEditDeletePost } = require('../middlewares');
// controllers
const {
  createPost,
  uploadImage,
  postsByUser,
  userPost,
  updatePost,
  deletePost,
  newsFeed,
} = require('../controllers/post');

router.post('/create-post', requireSignin, createPost);
router.post(
  '/upload-image',
  requireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
router.get('/user-posts', requireSignin, postsByUser);
router.get('/user-post/:_id', requireSignin, userPost);
router.put('/update-post/:_id', requireSignin, canEditDeletePost, updatePost);
router.delete(
  '/delete-post/:_id',
  requireSignin,
  canEditDeletePost,
  deletePost
);
router.get('/news-feed', requireSignin, newsFeed);

module.exports = router;
