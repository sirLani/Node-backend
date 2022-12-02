const express = require('express');

// middleware
const {
  requireSignin,
  addFollower,
  removeFollower,
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

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', requireSignin, currentUser);
router.post('/forgot-password', forgotPassword);
router.put('/profile-update', requireSignin, profileUpdate);
router.get('/find-people', requireSignin, findPeople);
router.put('/user-follow', requireSignin, addFollower, userFollow);
router.put('/user-unfollow', requireSignin, removeFollower, userUnfollow);
router.get('/user-following', requireSignin, userFollowing);

module.exports = router;
