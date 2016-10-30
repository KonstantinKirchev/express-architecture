const express = require('express')
const mongoose = require('mongoose')
let env = process.env.NODE_ENV || 'development'

let config = require('./server/config/config')[env]

mongoose.Promise = global.Promise

let app = express()

app.set('view engine', 'pug')
app.set('views', './server/views')


app.get('/', (req, res) => {
  console.log('Express ready!')
  mongoose
    .connect(config.db)
    .then(() => {
      console.log('MongoDB ready!')
      res.render('index')
    })
})
app.use(express.static('public'))
app.listen(config.port)
