const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')
// config
const app = express()
dotenv.config()
connectDB()
// routes
const users = require('./routes/users')
const todos = require('./routes/todos')
// app
app.use(express.json())
app.use(cors())
// app routes
app.use('/api/users', users)
app.use('/api/todos', todos)
// listening
app.listen(process.env.PORT, () => console.log('UP'))