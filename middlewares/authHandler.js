const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authHandler = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_ACCESS)
    req.user = await User.findById(decoded.id).select("-password")
    next ()
  } catch (e) {
    res.status(401).json({message: 'not authorized!'})
  }
}

module.exports = authHandler