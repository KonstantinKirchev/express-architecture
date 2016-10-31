const express = require('express')

// Set the environment
let env = process.env.NODE_ENV || 'development'
let config = require('./server/config/config')[env]

require('./server/config/database')(config)

let app = express()

app.set('view engine', 'pug')
app.set('views', './server/views')
app.use(express.static('public'))

// Server and DB are up and running
app.get('/', (req, res) => {
  console.log('Express ready!')
  res.render('index')
})

app.listen(config.port)
