const express = require('express')

const routers = new express.Router()

const postController = require('../controllers/postController')

routers.get('/posts', postController.index)


module.exports = routers
