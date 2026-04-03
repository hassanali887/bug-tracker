const express = require ('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// middleware
app.use(cors())
app.use(express.json())

//test route
app.get('/', (req, res) => {
    res.send('Bug tracker API is running')
})

//Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/bugs', require('./routes/bugRoutes'))

//Connect to mongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected') 
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => console.log(err))