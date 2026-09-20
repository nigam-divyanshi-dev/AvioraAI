import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";

const port = process.env.PORT 

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.json({ message: "hello from auth service" })
})

app.listen(port, () => {
    console.log(`Auth service started on port ${port}`)
    connectDb()
})