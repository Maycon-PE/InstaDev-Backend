const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const { username, password } = require('./config/mongo.json') // Não commitado

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-uvul0.mongodb.net/test?retryWrites=true&w=majority`, {
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


server.listen(8080, err => console.log(err? 'Error': 'Rodando'))
