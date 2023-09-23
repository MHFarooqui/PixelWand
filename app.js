require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const connectDB = require('./connection');
const port = process.env.PORT;
const authenticate = require('./middlewares/authenticate')
  
const app = express();
  
connectDB();
app.get('/', authenticate, (req, res ) => {
    res.send("hello world")
})

app.use(express.json())
app.use("/", require("./routes/CreateUser"))
app.use("/", require("./routes/Refresh"))
app.use("/", require("./routes/Logout"))

app.listen(port, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port " + port)
    else 
        console.log("Error occurred, server can't start", error);
    }
);