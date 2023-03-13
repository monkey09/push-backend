const express = require('express')
const { sendNotifications } = require('../config/notifications')
const authHandler = require('../middlewares/authHandler')
const Todo = require('../models/todo')
const cron = require('node-cron')
const { dateToCron } = require('../config/scheduler')
const Subscription = require('../models/subscription')
const router = express.Router()

router.get('/', authHandler, async (req, res) => {
  try {
    const todos = await Todo.find({owner: req.user}).sort({createdAt: 'desc'})
    res.status(200).json(todos)
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

router.post('/', authHandler, async (req, res) => {
  try {
    const {title, body, completed, schedule} = req.body
    if (!title || !body|| !schedule) 
      return res.status(401).json({message: 'empty fields!'})

    const todo = await Todo.create({
      title,
      body,
      completed,
      owner: req.user,
      schedule
    })

    
    cron.schedule(dateToCron(new Date(schedule)).toString(), async () => {
      const subs = await Subscription.find({owner: req.user._id})
      sendNotifications(
        subs, 
        `${title}`, 
        'Todo expiration date has been occurred!'
      )
    })

    res.status(200).json(todo)
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

router.patch('/:id', authHandler, async (req, res) => {
  try {
    const {completed} = req.body
    const todo = await Todo.findByIdAndUpdate (
      req.params.id, 
      {completed}, 
      {new: true}
    )
    res.status(200).json(todo)
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

router.delete('/:id', authHandler, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.status(200).json(todo)
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

module.exports = router