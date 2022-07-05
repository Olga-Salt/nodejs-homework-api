const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
// const bcrypt = require("bcryptjs");

const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const verificationToken = v4();

  const avatarURL = gravatar.url(email);

  const newUser = await new User({
    name,
    email,
    verificationToken,
    avatarURL,
  });

  newUser.setPassword(password);
  await newUser.save();
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //     await User.create({ name, email, password: hashPassword });

  const mail = {
    to: email,
    subject: "Подверждение email",
    html: `<p>Follow the link to confirm your email - localhost:3003/api/users/verify/${verificationToken}</p>`,
    // html: `<a target="_blank" href="http://localhost:3003/api/users/verify/${verificationToken}>Подвердите email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
