const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    schedule: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo