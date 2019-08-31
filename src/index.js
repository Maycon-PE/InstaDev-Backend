require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 8080

const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect(process.env.URL_CONNECTION, {
  useNewUrlParser: true
})

app.use((req, res, next) => {
  req.io = io

  next()
})

app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))
app.use(require('./routers/get'))
app.use(require('./routers/post'))
app.use(require('./routers/delete'))


server.listen(port, err => console.log(err? 'Error': `Rodando na porta:${port}`))
