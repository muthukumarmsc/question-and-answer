const { check } = require("express-validator");

exports.validLogin = {
    login: [
      [
        check("email", "Please enter the email")
        .not().isEmpty(),
        check("password", "Please enter the password")
          .not().isEmpty()
      ],  
    ],
  };