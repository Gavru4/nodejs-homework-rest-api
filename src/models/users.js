const { Users } = require("../db/userModal");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs").promises;
const sgMail = require("@sendgrid/mail");
const uuid = require("uuid");

const userSingUp = async (body) => {
  const { email, password, subscription } = body;

  const newUser = await Users.create({
    email,
    password: await bcryptjs.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    ),
    subscription,
    avatarURL: gravatar.url(email, { s: "100", r: "x", d: "retro" }, false),
    verificationToken: uuid.v4(),
  });
  const verificationToken = uuid.v4();

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "gavrromka086@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: `<p>confirm your email <a href="http://localhost:3000/api/users/verify/${verificationToken}">click here</a></p>`,
    html: `<p>confirm your email <a href="http://localhost:3000/api/users/verify/${verificationToken}">click here </a></p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      return true;
    })
    .catch((error) => {
      console.error(error);
    });
  return newUser;
};

const userLogin = async (body) => {
  const { email, password } = body;

  let user = await Users.findOne({ email, verify: true });

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

const updateUserAvatar = async (token, body) => {
  const { path, filename } = body;
  const newFile = await Jimp.read(path);
  const newPath = "./public/avatars/" + filename;
  await newFile.resize(250, 250).writeAsync(newPath);
  await fs.unlink(path);

  const user = await Users.findOneAndUpdate(
    { token },
    { avatarURL: newPath },
    { new: true }
  );
  return user;
};

const checkUserEmail = async (verificationToken) => {
  const user = await Users.findOneAndUpdate(
    verificationToken,
    { verificationToken: null, verify: true },
    { new: true }
  );
  return user;
};
const reCheckedUserEmail = async (body) => {
  const { email } = body;
  const user = await Users.findOne({ email });

  if (!user.verify) {
    const verificationToken = uuid.v4();

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: "gavrromka086@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: `<p>confirm your email <a href="http://localhost:3000/api/users/verify/${verificationToken}">click here</a></p>`,
      html: `<p>confirm your email <a href="http://localhost:3000/api/users/verify/${verificationToken}">click here </a></p>`,
    };
    return await sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        return true;
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    return false;
  }
};

module.exports = {
  userSingUp,
  userLogin,
  userLogout,
  getCurrentUser,
  updateUserAvatar,
  checkUserEmail,
  reCheckedUserEmail,
};
