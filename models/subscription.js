const mongoose = require('mongoose')

const subscriptionSchema = mongoose.Schema(
  {
    subscription: {
      type: Object,
      default: undefined
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    timestamps: true
  }
)

const Subscription = mongoose.model('Subscription', subscriptionSchema)
module.exports = Subscription