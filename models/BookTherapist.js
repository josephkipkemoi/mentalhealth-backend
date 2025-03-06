const mongoose = require("mongoose")
const Schema =  mongoose.Schema

const BookTherapySchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    date_available: {
        type: String,
        required: true
    }
})

const BookTherapy = mongoose.model("book_therapy", BookTherapySchema)

module.exports = BookTherapy