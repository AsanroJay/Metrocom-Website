const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.URI);
        console.log("MongoDB Connected!");
    } catch(error) {
        console.error("MongoDB Connection Error: ",error);
        process.exit(1);
    }
}

module.exports = connectDB; //so we can call it in app.js