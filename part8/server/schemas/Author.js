const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author name should be provided"],
    unique: true,
    minlength: [4, "Author name should be longer than 4"],
  },
  born: {
    type: Number,
  },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Author", schema);
