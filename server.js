const express = require("express");

const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const urlShortenerRoutes = require("./routes/urlShorterRouter");




connectDb(); 

const app = express();

app.use(cors())

const port = process.env.PORT || 5000;

app.use(express.json())

app.use("/api/shortener", urlShortenerRoutes);









app.listen(port, () => {
    console.log(`Server runiinrng port no ${port}`);
})