const { URLShortener, base62Encode } = require("../models/URLShortenermodel");
const asyncHandler = require("express-async-handler");

let counter = 1; // Counter to generate unique short codes

// Encode a long URL into a short one
const encodeURL = asyncHandler(async (req, res) => {
  const { longURL } = req.body;

  if (!longURL || typeof longURL !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortCode = base62Encode(counter);
  counter += 1;

  try {
    const newEntry = new URLShortener({
      shortCode,
      longURL,
    });

    await newEntry.save();

    res.status(201).json({
      message: "URL shortened successfully",
      shortURL: `https://short.url/${shortCode}`,
    });
  } catch (error) {
    console.error("Error saving to database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Decode a short URL to get the original long URL
const decodeURL = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  try {
    const entry = await URLShortener.findOne({ shortCode });

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(200).json({
      message: "Long URL retrieved",
      longURL: entry.longURL,
    });
  } catch (error) {
    console.error("Error retrieving from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  encodeURL,
  decodeURL,
};
