const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI environment variable is required')
  process.exit(1)
}
else {
  console.log('MONGODB_URI environment variable is set')
}

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)