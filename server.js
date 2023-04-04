const path = require("path")
const express = require("express")
require("dotenv").config()
const cors = require("cors")
const port = process.env.PORT || 5000
const connectDb = require("./config/db")
const app = express()
const ideasRouter = require("./routes/ideas")

connectDb()

//static folder 
app.use(express.static(path.join(__dirname, "public")))


//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//cors middleware
app.use(cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true
}))

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the RandomIdeas API" })
})


app.use('/api/ideas', ideasRouter)




app.listen(port, () => console.log(`Server listening on port ${port}`))

