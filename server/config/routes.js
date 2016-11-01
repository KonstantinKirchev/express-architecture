let controllers = require('../controllers')

module.exports = (app, config) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)
  app.get('/users/login', controllers.users.login)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })

  app.listen(config.port)
}
