const { expressjwt: jwt } = require('express-jwt');
const Post = require('../models/post');
const User = require('../models/user');

const requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    // console.log("POST in EDITDELETE MIDDLEWARE => ", post);
    if (req.auth._id != post.postedBy) {
      return res.status(400).send('Unauthorized');
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

const addFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $addToSet: { followers: req.auth._id },
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

const removeFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $pull: { followers: req.auth._id },
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  requireSignin,
  canEditDeletePost,
  addFollower,
  removeFollower,
};
