const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app, config) => {
  app.get('/', controllers.home.index)

  app.get('/users/register', controllers.users.register)
  app.post('/users/create', controllers.users.create)
  app.get('/users/login', controllers.users.login)
  app.post('/users/authenticate', controllers.users.authenticate)
  app.post('/users/logout', controllers.users.logout)

  // app.get('/admin/articles', auth.isInRole('Admin'), controllers.admin.articles)
  app.get('/article/list', controllers.article.list)
  app.get('/article/details/:id', auth.isAuthenticated, controllers.article.details)
  app.post('/article/details/:id/delete', auth.isAuthenticated, controllers.article.delete)
  app.get('/article/edit/:id', auth.isAuthenticated, controllers.article.edit)
  app.post('/article/edit/:id', auth.isAuthenticated, controllers.article.editarticle)
  app.get('/article/add', auth.isAuthenticated, controllers.article.add)
  app.post('/article/create', controllers.article.create)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })

  app.listen(config.port)
}
