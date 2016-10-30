const express = require('express')
const mongoose = require('mongoose')
const port = process.env.port || 1337
const env = process.env.NODE_ENV || 'development'
const connectionString = 'mongodb://localhost:27017/some-express-db'

mongoose.Promise = global.Promise

let app = express()

app.set('view engine', 'pug')
app.set('views', './server/views')


app.get('/', (req, res) => {
  console.log('Express ready!')
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log('MongoDB ready!')
      res.render('index')
    })
})
app.use(express.static('public'))
app.listen(port)
