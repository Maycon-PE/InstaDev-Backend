const express = require('express')
const routers = new express.Router()

const storage = require('../config/upload')

const multer = require('multer')
const upload = multer(storage)


const postController = require('../controllers/postController')
const likeController = require('../controllers/likeController')

routers.post('/posts', upload.single('image'), postController.store)
routers.post('/posts/:id/like', likeController.like)
routers.post('/posts/:id/deslike', likeController.deslike)

module.exports = routers
