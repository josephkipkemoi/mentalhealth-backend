const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5253
const path = require("path")
const ConnectDb = require("./db/connect")

// Database connection
ConnectDb()

app.use(cors({
    origin: ["http://localhost:3000", "https://zenconnect.vercel.app/"], 
    methods: "GET,POST,PUT,DELETE", 
    credentials: true, 
}))

app.use(cors({ origin: "https://zenconnect.vercel.app"}));

app.options("*", cors()); // Allow preflight for all routes

app.use(express.json({ extended: false }))

// Routes definition
app.get("/", (req, res) => {
    res.send("Hello from vercel")
})

app.use("/api/users", require("./routes/api/user"))
// app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/chatbot", require("./routes/api/chatbot"))
app.use("/api/community", require("./routes/api/community"))
app.use("/api/bookTherapy", require("./routes/api/bookTherapy"))
app.use("/api/contact-us", require("./routes/api/contact"))

// Serve static assets in production
// app.use(express.static("./build"))
app.use(cors({
    origin: ["http://localhost:3000", "https://zenconnect.vercel.app/"], 
    methods: "GET,POST,PUT,DELETE", 
    credentials: true, 
}))

if(process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

module.exports = app
