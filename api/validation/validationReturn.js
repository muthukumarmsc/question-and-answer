const { validationResult } = require("express-validator");

const validHelper = {
  async errRet(request, res, next) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }
    next();
  },
};

module.exports = validHelper;