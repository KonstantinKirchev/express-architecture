const passport = require('passport')
const LocalPassport = require('passport-local')
const User = require('mongoose').model('User')

module.exports = () => {
  // Give the startegy that you gonna use
  passport.use(new LocalPassport({usernameField: 'username', passwordField: 'password'}, (username, password, done) => {
    User.findOne({ username: username }).then(user => {
      // null is on the place of err because I don't care about any errors
      if (!user) return done(null, false)
      if (!user.authenticate(password)) return done(null, false)
      return done(null, user)
    })
  }))
  // on user_id every user will be differenciate. On first request the user id is saved in the cookie
  passport.serializeUser((user, done) => {
    if (user) return done(null, user._id)
  })
  // in second request it takes the id from the cookie and returns the user.
  // Then I can call it by req.user, because it is attached to the req.
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      if (!user) return done(null, false)
      return done(null, user)
    })
  })
}
