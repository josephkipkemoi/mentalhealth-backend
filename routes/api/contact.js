const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const Contact = require("../../models/Contact")

router.post("/", [
    check("full_name", "Please enter full name"),
    check("email", "Please enter email address"),
    check("subject", "Please enter subject"),
    check("message", "Please type a message")
], async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { full_name, email, subject, message } = req.query

    try {
        let contact = new Contact({
            full_name, 
            email,
            subject,
            message
        })

        await contact.save()

        res.json({
            message: "Message Received, one of our customer care agents will react out to you as soon as possible."
        })

    } catch (error) {

        console.error(error)
        res.json({
            message: "Server Error"
        })
    }

})

module.exports = router