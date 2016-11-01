const mongoose = require('mongoose')
const requiredValidationMessage = '{PATH} is required'

let articleSchema = mongoose.Schema({
  title: { type: String, required: requiredValidationMessage, unique: true },
  description: { type: String, required: requiredValidationMessage },
  owner: String
})

let Article = mongoose.model('Article', articleSchema)


