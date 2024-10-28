var  mongooseCon = require('mongoose');
var config = require("../Config/config");

mongooseCon.connect(config.dbconnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch((error) => console.error('Database connection failed:', error));

 
require('./Users');









