const express = require('express');
const cors = require('cors');
const app = express();

let config = require("./Config/config");
require("./model/db");

const port = config.port;
let apiRouter = require('./routes/apiRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('port', port);

app.use('/api', apiRouter);

app.get("/",(req,res)=>{
    console.log('Server started');

})
app.listen(port, () => {
    console.log('Server started on port '+port);
});

module.exports = app;
