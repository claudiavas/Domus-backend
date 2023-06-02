const express = require('express');
const generalRouter = express.Router();

const userRouter = require('./usersRoutes')
const { jwtMiddleware, authRouter} = require("../security/jwt")

// generalRouter.use("/", authRouter);
// generalRouter.use("/user",jwtMiddleware, userRouter);



module.exports = generalRouter;