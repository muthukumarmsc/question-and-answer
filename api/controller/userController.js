
const mongoose = require('mongoose');
const Users = require('../model/Users');
let passwordBcrypt = require('../helpers/password-bcrypt.helper');
let apiMwHelp = require("../helpers/api-middleware.helper");

const userController = {
    async register(req, res){
        try {
            const {
                body: bodyData = {}
            } = req;
            let userChk = await Users.findOne({ "email": bodyData.email }); 
            if (userChk){
                return res.json({
                    status: false,
                    message: "User Already Exits!"
                });
            }
            else {
                let passwordHash = await passwordBcrypt.getPasswordHash({passwordVal: bodyData.password});
                let insertData = {
                    username:  bodyData.username,
                    password: (passwordHash == false) ? "" : passwordHash,
                    mobile: bodyData.mobile,
                    email:  bodyData.email
                }
                let insertStatus = await Users.create(insertData);
                if (insertStatus){
                    return res.json({
                        status: true,
                        message: "User Registered Successfully!"
                    });
                }
                else {
                    return res.json({
                        status: false,
                        message: "User Registered Failed!"
                    });
                }
            }
        } catch (err){
            return res.json({
                status: false,
                message: "Something went wrog"
            });
        }
    },
    async login(req, res){
        try {
            const {
                body: bodyData = {}
            } = req;
            let userChk = await Users.findOne({ email: bodyData.email }); 
            if (userChk){
                let checkencrypt = await passwordBcrypt.passwordChk({
                    password: bodyData.password,
                    hash: userChk.password
                });
                if(!checkencrypt) {
                    return res.json({ "status": false, "message": "Invalid password" });
                }
                let securityKey = 0;
                if(userChk.securityKey) {
                    securityKey = userChk.securityKey;
                }
                else if(!userChk.securityKey) {
                    securityKey = Math.floor(Math.random() * 100000000);
                    userChk.securityKey = securityKey;
                }
                let userTkn = apiMwHelp.createUserToken(
                    userChk._id,
                    securityKey
                );
                let responseData = {
                    username: userChk.username,
                    mobile: userChk.mobile,
                    email: userChk.email,
                    createdAt: userChk.createdAt
                }
                return res.json({
                    status: true,
                    data: responseData,
                    access_token: userTkn,
                });
            }
            else {
                return res.json({ status: false, message: "Invalid User details" });
            }
        } catch (err){
            return res.json({
                status: false,
                message: "Something went wrog"
            });
        }
    }
}
module.exports = userController;