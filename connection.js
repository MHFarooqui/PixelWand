require('dotenv').config();
const mongoose = require('mongoose')
const mongoURI = process.env.DBCONNECTION_STRING

const connectDB = async() => {
    mongoose.set("strictQuery", false)
    await mongoose.connect(mongoURI)
    .then( () => {
        console.log("connected")});
}

module.exports = connectDB;