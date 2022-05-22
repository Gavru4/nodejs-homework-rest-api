const express = require("express");
const authorize = require("../../middlewares/authorize");
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
router.get("/logout", authorize, catchErrors(logoutUser));
router.get("/current", authorize, catchErrors(currentUser));

module.exports = { usersRouter: router };
