const { check } = require("express-validator");

exports.validRegister = {
    register: [
      [
        check("username", "Please enter the username")
          .not().isEmpty(),
        check("password", "Please enter the password")
          .not().isEmpty(),
        check("email", "Please enter the email")
          .not().isEmpty()
      ],  
    ],
  };