const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT
const authRouter = require('./routes/auth/auth')
const userRouter = require('./routes/user/user')
const todoRouter = require('./routes/todos/todos')
const authMiddleware = require('./middleware/auth')

app.use(bodyParser.json())
app.use('/', authRouter)
app.use(authMiddleware.isUserConnected)
app.use('/', userRouter)
app.use('/', todoRouter)

app.listen(port, () => {
})