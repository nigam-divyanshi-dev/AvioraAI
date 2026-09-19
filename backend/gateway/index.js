import express from "express";
import dotenv from "dotenv";
dotenv.config();
import proxy from "express-http-proxy";

const port = process.env.PORT 

const app = express()

app.use("/auth",proxy(process.env.AUTH_SERVICE))

app.get("/", (req, res) => {
    res.json({ message: "hello from gateway" })
})

app.listen(port, () => {
    console.log(`Gateway started on port ${port}`)
})