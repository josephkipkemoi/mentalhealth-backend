const express = require("express")
const router = express.Router()
const {check, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../../models/User")

// Register user route
router.post("/register",[
    check('phone_number', 'Please include a valid number').exists(),
    check("full_name", "Please enter full name").exists(),
    check("user_name", "Please enter a user name").exists(),
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 8 }),
    check("gender", "Please choose at least one gender").exists()
],async(req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { full_name, user_name, phone_number, email, password, confirm_password, gender } = req.body

    if(password !== confirm_password) {
        return res.status(400).json({errors: [{msg:'Passwords do not match'}]})
    }

    try {
        let user = await User.findOne({ phone_number })

        if(user) {
            return res.status(400).json({errors: [{msg:'User already exists'}]})
         }
  
         user = new User({
            full_name,
            user_name,
            phone_number,
            email,
            password,
            gender
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            "zenconnect_key",
            {expiresIn: 36000},
            (err, token) => {
                if(err) throw err;
                res.json({
                    user,
                    token
                })
            }
        )
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            def: "Server error",
            message: error.message
        })
    }
})

// Login user route
router.post("/login", [
    check("phone_number", "Please enter a valid phone number").exists(),
    check("password", "Please enter password").exists()
], async (req, res) => {
    const erros = validationResult(req)

    if(!erros.isEmpty()){
        return res.status(400).json({errors: erros.array()})
    }

    const { phone_number, password } = req.body

    try {
        let user = await User.findOne({ phone_number })

        if(!user) {
            return res.status(400).json({errors: [{msg:'Invalid credentials'}]})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        
        if(!isMatch){
            return res.status(400).json({errors: [{msg:'Invalid credentials'}]})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            "zenconnect_key",
            {expiresIn: 36000},
            (err, token) => {
                if(err) throw err;
                res.json({
                    user: JSON.stringify(user),
                    token
                })
            }
        )

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ 
            def: "Server error",
            message: error.message
         })
    }
})

module.exports = router