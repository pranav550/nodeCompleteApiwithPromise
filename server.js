const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./database/connection")
const app = express();
dotenv.config();
const bodyParser = require('body-parser');

//db connectivity
dbConnection()

// request payload
// app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())

//cors
app.use(cors())

app.use('/api/v1/product', require('./router/productRoutes'))
app.use('/api/v1/user', require('./router/userRoutes'))
app.use('/api/v1/upload', require('./router/uploadRoutes'))

app.get('/', (req, res) => {
    res.send("Hello ")
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Started on Port no " + PORT)
})

//error Hndling

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    })
})