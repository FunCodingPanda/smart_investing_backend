const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

app.disable('x-powered-by')

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

const loginRouter = require("./src/routers/login")
const stocksRouter = require("./src/routers/stocks")
const usersRouter = require("./src/routers/users")
const holdingsRouter = require("./src/routers/holdings")
const transactionRouter = require("./src/routers/transactions")

app.use('/login', loginRouter)
app.use('/stocks', stocksRouter)
app.use('/users', usersRouter)
app.use('/holdings', holdingsRouter)
app.use('/transactions', transactionRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

module.exports = app
