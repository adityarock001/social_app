const express = require('express')
const commentRoute = express.Router()
const commentController = require('../controllers/commentController')
const middleware = require('../middleware/authMiddleware')
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

commentRoute.post("/comment", middleware.verifyToken, commentController.commentPost)


module.exports = commentRoute