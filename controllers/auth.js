const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

const register = async (req, res) => {
  //   console.log("REGISTER ENDPOINT => ", req.body);

  const { name, email, password, secret } = req.body;
  // validation
  if (!name) {
    return res.json({
      error: 'Name is required',
    });
  }
  if (!password || password.length < 6) {
    return res.json({
      error: 'Password is required and should be min 6 characters long',
    });
  }
  if (!secret) {
    return res.json({
      error: 'Answer is required',
    });
  }
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      error: 'Email is taken',
    });
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    secret,
    username: nanoid(6),
  });
  try {
    await user.save();
    console.log('REGISTERED USER => ', user);
    return res.json({
      ok: true,
      name,
      email,
    });
  } catch (err) {
    console.log('REGISTER FAILED => ', err);
    return res.status(400).send('Error. Try again.');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.json({
        error: 'No user found',
      });
    }

    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: 'Wrong password',
      });
    }

    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error. Try again.');
  }
};

const currentUser = async (req, res) => {
  // console.log(req.auth);
  try {
    const user = await User.findById(req.auth._id);
    // res.json(user);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const forgotPassword = async (req, res, next) => {
  console.log(req.body);
  const { email, newPassword, secret } = req.body;
  // validation
  if (!newPassword || newPassword.length < 6) {
    return res.json({
      error: 'New password is required and should be min 6 characters long',
    });
  }
  if (!secret) {
    return res.json({
      error: 'Secret is required',
    });
  }
  let user = await User.findOne({ email, secret });
  // console.log("EXIST ----->", user);
  if (!user) {
    return res.json({
      error: 'We cant verify you with those details',
    });
  }
  // return res.status(400).send("We cant verify you with those details");

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: 'Congrats. Now you can login with your new password',
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: 'Something wrong. Try again.',
    });
  }
};

const profileUpdate = async (req, res) => {
  try {
    // console.log("profile update req.body", req.body);
    const data = {};

    if (req.body.username) {
      data.username = req.body.username;
    }
    if (req.body.about) {
      data.about = req.body.about;
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.json({
          error: 'Password is required and should be min 6 characters long',
        });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }
    if (req.body.secret) {
      data.secret = req.body.secret;
    }
    if (req.body.image) {
      data.image = req.body.image;
    }

    let user = await User.findByIdAndUpdate(req.auth._id, data, { new: true });
    // console.log('udpated user', user)
    user.password = undefined;
    user.secret = undefined;
    res.json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ error: 'Duplicate username' });
    }
    console.log(err);
  }
};
const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    // user.following
    let following = user.following;
    following.push(user._id);
    const people = await User.find({ _id: { $nin: following } })
      .select('-password -secret')
      .limit(10);
    res.json(people);
  } catch (err) {
    console.log(err);
  }
};

const userFollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $addToSet: { following: req.body._id },
      },
      { new: true }
    ).select('-password -secret');
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

const userFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    const following = await User.find({ _id: user.following }).limit(100);
    res.json(following);
  } catch (err) {
    console.log(err);
  }
};

const userUnfollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $pull: { following: req.body._id },
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      '-password -secret'
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  register,
  login,
  currentUser,
  forgotPassword,
  profileUpdate,
  findPeople,
  userFollow,
  userFollowing,
  userUnfollow,
  getUser,
};
