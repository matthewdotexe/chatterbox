const { validationResult } = require("express-validator/check");

exports.formValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send({ errors: errors.array() });
    return;
  }
  next();
};

exports.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.send({ authentication: "false", session: req.session });
};
