const express = require('express')
const mongoose = require('mongoose')
const port = 1337
const connectionString = 'mongodb://localhost:27017/some-express-db'

mongoose.Promise = global.Promise

let app = express()

app.get('/', (req, res) => {
  console.log('Express ready!')
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log('MongoDB ready!')
      res.send('OK!')
    })
})

app.listen(port)
