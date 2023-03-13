const webpush = require('web-push')
const dotenv = require('dotenv')
dotenv.config()
const vapidDetails = {
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  subject: process.env.SUBJECT
}

const sendNotifications = (subs, title, body) => {
  const notification = JSON.stringify({
    title,
    options: {body}
  })
  const options = {
    TTL: 10000,
    vapidDetails: vapidDetails
  }
  subs.forEach(sub => {
    webpush.sendNotification(sub.subscription, notification, options)
  })
}

module.exports = { sendNotifications }