let express = require('express')

module.exports = (app, config) => {
  app.set('view engine', 'pug')
  app.set('views', config.rootPath + 'server/views')

  app.use(express.static('public'))

  console.log('Express ready!')
}
