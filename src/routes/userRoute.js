const express = require('express')
const userRoute = express.Router()
const userController = require('../controllers/userController')
const middleware = require("../middleware/authMiddleware")

userRoute.post('/signup', userController.userSignUp)
userRoute.post('/login', userController.UserLogin)
userRoute.get("/profile/:id", middleware.verifyToken, userController.userProfile);

module.exports = userRoute;