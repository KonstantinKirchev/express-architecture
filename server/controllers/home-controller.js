module.exports = {
  index: (req, res) => {
    var passedMessage = req.query.message
    res.render('home/index', { Message: passedMessage })
  }
}
