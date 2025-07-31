const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
//const { errorHandler } = require('./middleware/errorMiddleWare')
const connectDB = require('./config/db')

console.log('Mongo URI:', process.env.MONGO_URI);

connectDB()

const app = express()

//app.use(express.json())
//app.use(express.urlencoded({ extended: false }))

//app.use(errorHandler)
app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))