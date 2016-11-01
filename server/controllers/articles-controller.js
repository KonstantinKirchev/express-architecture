let Article = require('mongoose').model('Article')

module.exports = {
  add: (req, res) => {
    res.render('article/add')
  },
  create: (req, res) => {
    let article = req.body
    // if (user.password !== user.confirmPassword) {
    //   user.globalError = 'Password do not match!'
    //   res.render('users/register', { user })
    // } else {
    article.owner = res.locals.currentUser.username
    Article.create(article).then(article => {
      var message = encodeURIComponent('Successfully created!')
      res.redirect('/?message=' + message)
    })
    // }
  },
  list: (req, res) => {
    res.render('article/list')
  },
  details: (req, res) => {
    res.render('article/details/:id')
  },
  edit: (req, res) => {
    res.render('article/edit/:id')
  }
}
