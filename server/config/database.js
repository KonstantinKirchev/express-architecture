let mongoose = require('mongoose')
let fs = require('fs')

mongoose.Promise = global.Promise

module.exports = (config) => {
  mongoose.connect(config.db)
  let db = mongoose.connection
  db.once('open', (err) => {
    if (err) throw err
    console.log('MongoDB ready!')
  })
  db.on('error', (err) => {
    fs.appendFile('log.txt', err, function (err) {
      if (err) throw err
      console.log('The error is saved to log.txt!')
    })
  })
  // to seed the admin User
  require('../data/User').seedAdminUser()
  require('../data/Article')
}
