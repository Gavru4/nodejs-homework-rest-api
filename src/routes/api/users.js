const express = require("express");
const authenticate = require("../../middlewares/authorize");
const {
  catchSignupErrors,
  catchLoginErrors,
  catchErrors,
} = require("../../middlewares/cathErrors");

const {
  singUpUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../../controllers/users");

const {
  userLoginLogoutValidation,
} = require("../../middlewares/validationSchema");
const router = express.Router();

router.post(
  "/signup",
  userLoginLogoutValidation,
  catchSignupErrors(singUpUser)
);

router.post("/login", userLoginLogoutValidation, catchLoginErrors(loginUser));
router.post("/logout", authenticate, catchLoginErrors(logoutUser));
router.post("/current", authenticate, catchErrors(currentUser));

module.exports = { usersRouter: router };
