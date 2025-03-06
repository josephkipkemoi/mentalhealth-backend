const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 32959035
const path = require("path")
const ConnectDb = require("./db/connect")

// Database connection
ConnectDb()

app.use(cors())
app.use(express.json({ extended: false }))

// Routes definition
app.use("/api/users", require("./routes/api/user"))
// app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/chatbot", require("./routes/api/chatbot"))
app.use("/api/community", require("./routes/api/community"))

// Serve static assets in production
// app.use(express.static("./build"))

// if(process.env.NODE_ENV === "production") {
//     // Set static folder
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "build", "index.html"))
//     })
// }

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})