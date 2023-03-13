const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {dbName: 'reminder'})
  } catch (e) {
    process.exit()
  }
}

module.exports = connectDB