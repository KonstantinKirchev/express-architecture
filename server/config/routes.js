module.exports = (app, config) => {
  app.get('/', (req, res) => {
    res.render('index')
  })

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })

  app.listen(config.port)
}
