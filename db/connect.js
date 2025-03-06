
// import { MongoClient } from "mongodb";
const mongoose = require('mongoose');

const ConnectDb = async () => {
        try{
        await mongoose.connect("mongodb+srv://jkemboe:32959035Jk!@zenconnect.4anlf.mongodb.net/?retryWrites=true&w=majority&appName=zenconnect")
        console.log('MongoDB connected...')
        } catch (err) {
        console.error(err.message)
            // exit process without failure
        process.exit(1)
}}

module.exports = ConnectDb