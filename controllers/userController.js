const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");

const User = mongoose.model("User");

exports.registerNewUser = async (req, res) => {
  const formatter = new User();
  const user = new User({
    username: req.body.username,
    firstName: formatter.sentenceCaseName(req.body.firstName),
    lastName: formatter.sentenceCaseName(req.body.lastName),
    email: req.body.email,
    // A pre hook is utilized to hash the user password upon save
    // Visit User model for more details
    passwordHash: req.body.password,
    dateCreated: new Date(),
    isOnline: false
  });

  try {
    await user.save();
    res.send("🎉 Congratulations! You're officially a Chatterbox member! 🎉");
  } catch (error) {
    res.status(500).send({
      errors: [
        {
          msg: "Unable to create your account right now. Please try again."
        }
      ]
    });
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  let match;
  if (user) {
    match = await bcrypt.compare(req.body.password, user.passwordHash);
  }

  if (user && match) {
    req.login(user, err =>
      err
        ? console.error(err)
        : res.send({ success: true, redirectUrl: "/chatterbox" })
    );
  } else {
    res.send({
      errors: [
        {
          param: "password",
          msg:
            "Either your username and/or password is invalid. Please try again!"
        }
      ]
    });
  }
};

exports.getUser = (req, res) => {
  const { firstName, lastName, username, email, dateCreated, _id } = req.user;
  res.send({ firstName, lastName, username, email, dateCreated, _id });
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("You are now logged out!");
};
