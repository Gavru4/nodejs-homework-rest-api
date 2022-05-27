const {
  userSingUp,
  userLogin,
  userLogout,
  getCurrentUser,
  updateUserAvatar,
  checkUserEmail,
  reCheckedUserEmail,
} = require("../models/users");

const singUpUser = async (req, res, next) => {
  const user = await userSingUp(req.body);
  res.status(201).json({
    contentType: "application/json",
    ResponseBody: { user },
  });
};

const loginUser = async (req, res, next) => {
  const { token, email, subscription } = await userLogin(req.body);
  res.status(201).json({
    contentType: "application/json",
    ResponseBody: {
      user: {
        email: email,
        subscription: subscription,
      },
      token: token,
    },
  });
};

const logoutUser = async (req, res, next) => {
  await userLogout(req.user.token);
  res.sendStatus(204);
};

const currentUser = async (req, res, next) => {
  const user = await getCurrentUser(req.user.token);
  res.status(200).send(user);
};

const getUserAvatar = async (req, res, next) => {
  const user = await updateUserAvatar(req.user.token, req.file);
  res.status(200).send(user);
};

const verificationUserEmail = async (req, res, next) => {
  await checkUserEmail(req.params.verificationToken);
  res.status(200).json({
    ResponseBody: { message: "Verification successful" },
  });
};
const ResendingVerificationUserEmail = async (req, res, next) => {
  await reCheckedUserEmail(req.body.email);
  if (req.body.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }
  res.status(200).json({
    ResponseBody: { message: "Verification successful" },
  });
};

module.exports = {
  singUpUser,
  loginUser,
  logoutUser,
  currentUser,
  getUserAvatar,
  verificationUserEmail,
  ResendingVerificationUserEmail,
};
