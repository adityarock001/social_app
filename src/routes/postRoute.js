const express = require('express')
const postRoute = express.Router()
const postController = require('../controllers/postController')
const middleware = require('../middleware/authMiddleware')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

postRoute.post("/upload", middleware.verifyToken, upload.single('file'), postController.uploadPost)
postRoute.get("/list", middleware.verifyToken, postController.getPostList)
postRoute.post("/update", middleware.verifyToken, upload.single('file'), postController.updatePost)
// postRoute.post("/like", middleware.verifyToken, postController.postLike)
// postRoute.post("/unlike", middleware.verifyToken, postController.postUnlike)
// postRoute.get("/like/list", middleware.verifyToken, postController.getPostLikeList)

module.exports = postRoute
