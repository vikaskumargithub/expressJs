const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  convert an integer to a base62 representation
function base62Encode(number) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const base = characters.length;
  let encoded = "";
  while (number > 0) {
    encoded = characters[number % base] + encoded;
    number = Math.floor(number / base);
  }
  return encoded;
}

const URLShortenerSchema = new Schema({
  shortCode: {
    type: String,
    unique: true,
    required: true,
  },
  longURL: {
    type: String,
    required: true,
  },
});

const URLShortener = mongoose.model("URLShortener", URLShortenerSchema);

module.exports = {
  URLShortener,
  base62Encode,
};
