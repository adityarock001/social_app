const express = require('express')
require('dotenv').config()
const connection = require('./src/db/connect')
const app = express()
const userRoute = require('./src/routes/userRoute')

app.use(express.json())
app.use('/user', userRoute)


app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})