const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar");
// const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL });
  newUser.setPassword(password);
  newUser.save();
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //     await User.create({ name, email, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
        avatarURL,
      },
    },
  });
};

module.exports = register;
