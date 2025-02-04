const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(email, password);

  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password wrong or not verify");
  }

  //   if (!user) {
  //     throw new Unauthorized(`Email ${email} not found`);
  //   }
  //   const comparePass = bcrypt.compareSync(password, user.password);

  //   if (!comparePass) {
  //     throw new Unauthorized("Password wrong");
  //   }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
