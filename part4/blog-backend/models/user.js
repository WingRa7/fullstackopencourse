const mongoose = require('mongoose')

// Custom validation functions
const isUsernameLength = (username) => {
  return username.length >= 3
}

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Password is required'],
    unique: true,
    validate: {
      validator: isUsernameLength,
      message: 'Username must be atleast 3 characters long' // also implemented on controller
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  passwordHash: {
    type: String,
    required: true //can't handle validation here
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports =  mongoose.model('User', userSchema)