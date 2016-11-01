let controllers = require('../controllers')

module.exports = (app, config) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })

  app.listen(config.port)
}
