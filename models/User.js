const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    user_name: {
        type: String
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', UserSchema)

module.exports = User