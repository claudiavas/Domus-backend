const express = require('express');
const generalRouter = express.Router();

const userRouter = require('./userRoutes')
const { jwtMiddleware, authRouter} = require("../security/jwt")

module.exports = generalRouter;