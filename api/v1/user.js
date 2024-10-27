const express = require('express');
const router = express.Router();
const { validRegister } = require("../validation/register.validation");
const { validLogin } = require("../validation/login.validation");
const validationReturn = require("../Validation/validationReturn");
const userdataController = require("../controller/userController");
const apiMwHelp = require("../helpers/api-middleware.helper");

router.post(
    "/register",
    validRegister.register, 
    validationReturn.errRet, 
    userdataController.register,
);
router.post(
    "/login",
    validLogin.login, 
    validationReturn.errRet, 
    userdataController.login,
);

module.exports = router;