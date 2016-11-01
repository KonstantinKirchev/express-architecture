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
    Article.find().then(function (data) {
      res.render('article/list', { articles: data })
    })
  },
  details: (req, res) => {
    Article.findById(req.params.id).then(function (data) {
      res.render('article/details', data)
    })
  },
  edit: (req, res) => {
    Article.findById(req.params.id).then(function (data) {
      res.render('article/edit', data)
    })
  },
  editarticle: (req, res) => {
    let articleId = req.params.id
    let articleTitle = req.body.title
    let articleDescription = req.body.description

    if (articleTitle === '') {
      addMessage(req, res, 'You need to fill a Title')
      return false
    }

    if (articleDescription === '') {
      addMessage(req, res, 'You need to fill a Description')
      return false
    }

    if (articleId) {
      Article.findById(articleId).then(function (article) {
        article.title = articleTitle
        article.description = articleDescription
        article.save()
        var successMsg = '<p>You have successfully edited an Article</p>'
        addMessage(req, res, successMsg)
      })
    }
  },
  delete: (req, res) => {
    Article.findOneAndRemove({_id: req.params.id}).then(function () {
      var html = '<p>You have successfully deleted an article</p> <a href="/article/list">Go back to article list</a>'

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(html)
      res.end()
    })
  }
}

function addMessage (req, res, text) {
  if (req.params.id) {
    var href = '/add-games/' + req.params.id

    var message = '<p>' + text + '</p><a href=' + href + '>Go back</a>'
  } else {
    message = '<p>' + text + '</p><a href="/add-games">Go back</a>'
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.write(message)
  res.end()
}
