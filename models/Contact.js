const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Contact = mongoose.model("contact", ContactSchema)

module.exports = Contact