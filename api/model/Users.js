const mongooseData = require("mongoose");
var Schema = mongooseData.Schema;

var usersSchema = new Schema({
  username : { type: String, default: "" },
  password : { type: String, default: "" },
  email :  { type: String, default: "" },
  securityKey: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});
module.exports = mongooseData.model("Users", usersSchema, "Users");
