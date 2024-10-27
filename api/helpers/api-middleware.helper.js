var config = require("../Config/config");
const mongoosedata = require("mongoose");
let jwt = require("jsonwebtoken");

const UsersDB = require('../model/Users');

let jwtTokenCustomers = config.jwtTokenCustomers;

exports.createUserToken = (key, securityKey = "") => {
  let payload = { subject: key, securityKey };
  let token = jwt.sign(payload, jwtTokenCustomers);
  return token;
};

exports.customerTokenChk = async (request, res, next) => {
  try {
    if (!request.headers.authorization) {
      return res.status(401).json({ status: false, message: "unauthorized" });
    }
    let token = request.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).json({ status: false, message: "unauthorized" });
    } else {
      let payload = jwt.verify(token, jwtTokenCustomers);
      if (!payload) {
        return res.status(401).json({ status: false, message: "unauthorized" });
      }

      const matchData = { _id: new mongoosedata.Types.ObjectId(payload.subject) };
      const selectData = {
        _id: 1,
        username: 1,
        email: 1,
        securityKey:1
      }
      const userData = await UsersDB.findOne(matchData, selectData);
      if (userData) {
      
        request.user = {
          type: "user",
          data: userData,
          userId: payload.subject,
          securityKey: payload.securityKey
        }
        next();
      } else {
        return res.status(401).json({ status: false, message: "unauthorized" });
      }
    }
  } catch (e) {
    console.log("tokenMiddlewareCustomers", e, request.headers.authorization);
    return res.status(401).json({ status: false, message: "unauthorized" });
  }
};

