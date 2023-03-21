const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')
const path = require("path")
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
// deploy
const __dirname1 = path.resolve()
app.use(express.static(path.join(__dirname1, "/out")))
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "out", "index.html"))
)
// listening
app.listen(process.env.PORT, () => console.log('UP'))