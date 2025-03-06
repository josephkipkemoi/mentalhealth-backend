const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommunitySchema = new Schema({
    category: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Community = mongoose.model("community", CommunitySchema)

module.exports = Community