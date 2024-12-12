const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    delete user.password;
    delete user.__v;

    res.status(200).json({ token, status:200, user });

  } catch (error) {
    console.log(error);
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists", status:400 });
    }

    user = new User({ name, email, password });

    await user.save();

    delete user.password;
    delete user.__v;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(201).json({user, token, status:201 });

  } catch (error) {
    console.log(error);
  } 
};
