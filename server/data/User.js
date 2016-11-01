const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const requiredValidationMessage = '{PATH} is required'

let userSchema = mongoose.Schema({
  username: { type: String, required: requiredValidationMessage, unique: true },
  firstName: { type: String, required: requiredValidationMessage },
  secondName: { type: String, required: requiredValidationMessage },
  salt: String,
  hashedPass: String,
  roles: [String]
})

userSchema.method({
  authenticate: function (password) {
    if (encryption.generateHashedPassword(this.salt, password) === this.hashedPass) {
      return true
    } else {
      return false
    }
  }
})

let User = mongoose.model('User', userSchema)

// It will be called only once and add an admin
module.exports.seedAdminUser = () => {
  User.find({}).then((users) => {
    if (users.length > 0) return
    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, 'mama2119')
    User.create({
      username: 'blueeagle',
      firstName: 'Konstantin',
      lastName: 'Kirchev',
      salt: salt,
      hashedPass: hashedPass,
      roles: ['Admin']})
  })
}
