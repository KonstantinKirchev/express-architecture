const express = require('express')
let app = express()

// Set the environment
let env = process.env.NODE_ENV || 'development'
let config = require('./server/config/config')[env]

require('./server/config/database')(config)
require('./server/config/express')(app, config)

// Server and DB are up and running
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(config.port)
