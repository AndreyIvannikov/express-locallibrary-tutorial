const { model, Schema } = require("mongoose");

const GenreShema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
});

GenreShema.virtual("url").get(() => "/catalog/genre/");

module.exports = model("Genre", GenreShema);
