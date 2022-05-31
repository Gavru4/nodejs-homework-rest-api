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
  getUserAvatar,
  verificationUserEmail,
  resendingVerificationUserEmail,
} = require("../../controllers/users");
const {
  userLoginLogoutValidation,
} = require("../../middlewares/validationSchema");

const multer = require("multer");
const mime = require("mime-types");
const uuid = require("uuid");

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const extname = mime.extension(file.mimetype);
      const filename = uuid.v4() + "." + extname;
      cb(null, filename);
    },
    destination: "./tmp",
  }),
});

const router = express.Router();

router.post(
  "/signup",
  userLoginLogoutValidation,
  catchSignupErrors(singUpUser)
);

router.post("/login", userLoginLogoutValidation, catchLoginErrors(loginUser));
router.get("/logout", authorize, catchErrors(logoutUser));
router.get("/current", authorize, catchErrors(currentUser));
router.patch(
  "/avatars",
  authorize,
  upload.single("avatar"),
  catchErrors(getUserAvatar)
);

router.get("/verify/:verificationToken", catchErrors(verificationUserEmail));
router.post("/users/verify/", catchErrors(resendingVerificationUserEmail));

module.exports = { usersRouter: router };
