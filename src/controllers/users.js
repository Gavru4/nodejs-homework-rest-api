const {
  userSingUp,
  userLogin,
  userLogout,
  getCurrentUser,
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
  // const currentUser = await userLogout(req.user.token);
  // currentUser.token = null;
  await userLogout(req.user.token);

  res.sendStatus(204);
};
const currentUser = async (req, res, next) => {
  const user = await getCurrentUser(req.user.token);
  res.status(200).send(user);
};

module.exports = { singUpUser, loginUser, logoutUser, currentUser };
