var bcrypt = require('bcrypt');
var crypto = require("crypto");
let jwt = require("jsonwebtoken");
var config = require("../Config/config");
const saltRounds = 10;

exports.encrypt = (value) => {
    var cipher = crypto.createCipheriv(config.algorithm, config.passPhrase, config.iv);
   console.log("cipher:",cipher)
    var crypted = cipher.update(value, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  };


exports.getPasswordHash = async(data) => {
    let salt = await bcrypt.genSalt(saltRounds);
   console.log({salt})

    let hash = await bcrypt.hash(data.passwordVal, salt);
    if (hash){
        return hash;
    }
    else{
        return false;
    }
}

exports.passwordChk = async(reqBody) => {
    let resp = await bcrypt.compare(reqBody.password, reqBody.hash);
    if (resp) {
        return true;
    }
    else {
        return false;
    }
}