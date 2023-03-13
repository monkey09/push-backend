const express = require('express')
const User = require('../models/user')
const { accessGenerator } = require('../utils/tokenHandler')
const authHandler = require('../middlewares/authHandler')
const Subscription = require('../models/subscription')
const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const {email, name, password} = req.body
    if (!name || !email || !password) 
      return res.status(400).json({message: 'empty fields!'})

    const userExists = await User.findOne({ email })
    if (userExists) 
      return res.status(400).json({message: 'user exists!'})

    const user = await User.create({
      name,
      email,
      password
    })

    if (user) 
      return res.status(201).json({message: 'created successfully'})
    else
      return res.status(401).json({message: 'creation failed!'})

  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

router.post('/signin', async (req, res) => {
  try {
    const {email, password} = req.body
    if (!email || !password) 
      return res.status(400).json({message: 'empty fields!'})

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: accessGenerator(user._id)
      })
    } else 
      res.status(404).json({message: 'not found!'})

  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

router.post('/add-subscription', authHandler, async(req, res) => {
  await Subscription.create({
    subscription: req.body,
    owner: req.user
  })
  res.status(200).send()
})

module.exports = router