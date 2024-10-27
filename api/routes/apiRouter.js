const express = require('express');
const router = express.Router();
let userRouter = require('../v1/user');

router.use("/v1/user",userRouter);

module.exports = router;