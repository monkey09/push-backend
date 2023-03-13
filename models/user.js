const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function(next) {
  const user = this

  if (user.isModified('password')) 
    user.password = await bcrypt.hash(user.password, 8)

  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User