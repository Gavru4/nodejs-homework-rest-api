const { Users } = require("../db/userModal");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSingUp = async (body) => {
  const { email, password, subscription } = body;

  const newUser = await Users.create({
    email,
    password: await bcryptjs.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    ),
    subscription,
  });
  return newUser;
};

const userLogin = async (body) => {
  const { email, password } = body;

  let user = await Users.findOne({ email });

  const isPasswordCorrect = await bcryptjs.compare(password, user.password);

  if (isPasswordCorrect) {
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user = await Users.findOneAndUpdate({ email }, { token }, { new: true });
    return user;
  }
};

const userLogout = async (token) => {
  const user = await Users.findOneAndUpdate(
    { token },
    { token: null },
    { new: true }
  );
  return user;
};
const getCurrentUser = async (token) => {
  const user = await Users.findOne(
    { token },
    { email: 1, subscription: 1, _id: 0 }
  );
  return user;
};
module.exports = { userSingUp, userLogin, userLogout, getCurrentUser };
