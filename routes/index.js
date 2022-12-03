const express = require('express');
const formidable = require('express-formidable');
const {
  createPost,
  uploadImage,
  postsByUser,
  userPost,
  updatePost,
  deletePost,
  newsFeed,
  likePost,
  unlikePost,
  addComment,
  removeComment,
} = require('../controllers/post');

// middleware
const {
  requireSignin,
  addFollower,
  removeFollower,
  canEditDeletePost,
} = require('../middlewares');
// controllers
const {
  register,
  login,
  currentUser,
  forgotPassword,
  profileUpdate,
  findPeople,
  userFollow,
  userFollowing,
  userUnfollow,
} = require('../controllers/auth');

const router = express.Router();

//AUTH

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', requireSignin, currentUser);
router.post('/forgot-password', forgotPassword);
router.put('/profile-update', requireSignin, profileUpdate);
router.get('/find-people', requireSignin, findPeople);
router.put('/user-follow', requireSignin, addFollower, userFollow);
router.put('/user-unfollow', requireSignin, removeFollower, userUnfollow);
router.get('/user-following', requireSignin, userFollowing);

//POSTS

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
router.put('/like-post', requireSignin, likePost);
router.put('/unlike-post', requireSignin, unlikePost);
router.put('/add-comment', requireSignin, addComment);
router.put('/remove-comment', requireSignin, removeComment);

module.exports = router;
