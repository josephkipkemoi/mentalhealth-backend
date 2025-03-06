const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const BookTherapy = require("../../models/BookTherapist")

router.post("/", [
    check("full_name", "Please enter full name"),
    check("phone_number", "Please enter phone number"),
    check("date_available", "Please enter date")
], async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { full_name, phone_number, date_available } = req.query

    try {
        let bookTherapy = new BookTherapy({
            full_name, 
            phone_number,
            date_available
        })

        await bookTherapy.save()

        res.json({
            message: "Therapy session set, you will be notified via SMS"
        })

    } catch (error) {
        console.error(error)
        res.json({
            message: "Server Error"
        })
    }

})

module.exports = router