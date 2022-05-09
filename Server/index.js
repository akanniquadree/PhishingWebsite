const express = require("express")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const mongoose = require("mongoose")
const authRouter = require("./Routes/Auth")
const websiteRouter = require("./Routes/Website")
const cors = require("cors")

const app = express()
dotenv.config()
mongoose.connect("mongodb+srv://Quadry30:youngdollar@cluster0.tuos2.mongodb.net/pishing-website?retryWrites=true&w=majority", {
    useNewUrlParser:true
},()=>{
    console.log("Connected to Database")
})

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan())

app.use("/api", websiteRouter)
app.use("/api", authRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`server is listening on ${process.env.PORT}`)
})