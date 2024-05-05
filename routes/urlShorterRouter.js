const express = require("express");
const { encodeURL, decodeURL } = require("../controllers/urlShorterController");

const router = express.Router();


router.post("/shorten", encodeURL);   


router.get("/:shortCode", decodeURL); 


module.exports = router;
