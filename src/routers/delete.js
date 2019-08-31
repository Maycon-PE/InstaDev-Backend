const express = require('express')
const routers = new express.Router()

const deleteController = require('../controllers/deleteController')

routers.delete('/posts/:id/delete', deleteController.delete)

module.exports = routers
