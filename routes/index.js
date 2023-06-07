const express = require('express');
const generalRouter = express.Router();

const userRouter = require('./userRoutes')
const { jwtMiddleware, authRouter} = require("../security/jwt")

// generalRouter.use("/", authRouter);
// generalRouter.use("/user",jwtMiddleware, userRouter);



module.exports = generalRouter;