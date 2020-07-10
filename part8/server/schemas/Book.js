const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    unique: true,
    minlength: [2, "Title should be more than 2 words"],
  },
  published: {
    type: Number,
    required: [true, "published date is necessary"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [{ type: String }],
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Book", schema);
