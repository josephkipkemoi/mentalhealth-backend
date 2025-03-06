const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
const {check} = require('express-validator');

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyACB2m7AmnfW0PpkqXqPfBn0pjj3pQ0nwU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.get("/",[
    check("message", "Please enter a message")
], async(req, res) => {
    const { message, age_group, preff_lang } = req.query
    const prompt = `as a ${age_group} year old, please give advice in ${preff_lang} do not use any other language other than ${preff_lang } with not less than 150 words, give an answer as a therapist, this is my message, ${message}`
    const result = await model.generateContent(prompt)

    res.json({
        message: result.response.text()
    })  
})

module.exports = router