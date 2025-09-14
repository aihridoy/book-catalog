const { User } = require("../models/userModel");

exports.addUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .send({
          status: false,
          error: "Email, password, and username are required",
        });
    }
    const user = new User({ email, password, username });
    const savedUser = await user.save();
    const token = savedUser.generateAuthToken();
    res
      .status(201)
      .send({ status: true, data: { ...savedUser.toObject(), token } });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password"
    );
    if (user) {
      return res.send({ status: true, data: user });
    }
    res.send({ status: false });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ status: false, error: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .send({ status: false, error: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    res.send({
      status: true,
      data: { ...user.toObject(), token },
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};
