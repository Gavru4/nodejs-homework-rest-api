module.exports.catchErrors = (middleware) => {
  return async (req, res) => {
    try {
      await middleware(req, res);
    } catch (err) {
      return res.status(404).json({ status: "Not found" });
    }
  };
};
module.exports.catchSignupErrors = (middleware) => {
  return async (req, res) => {
    try {
      await middleware(req, res);
    } catch (err) {
      return res.status(409).json({
        contentType: "application/json",
        ResponseBody: { message: "Email in use" },
      });
    }
  };
};
module.exports.catchLoginErrors = (middleware) => {
  return async (req, res) => {
    try {
      await middleware(req, res);
    } catch (err) {
      return res
        .status(401)
        .json({ ResponseBody: { message: "Email or password is wrong" } });
    }
  };
};
