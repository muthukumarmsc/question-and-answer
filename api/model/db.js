var  mongooseCon = require('mongoose');
var config = require("../Config/config");

mongooseCon.connect(config.dbconnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 
 
require('./Users');









