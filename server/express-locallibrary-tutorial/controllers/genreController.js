const Genre = require("../models/genre");
const Book = require("../models/book");
const async = require("async");

// Display list of all Genre.
exports.genre_list = function (req, res, next) {
  Genre.find().exec((err, genreList) => {
    if (err) {
      return next(err);
    }
    res.send({
      genreList,
    });
  });
};

// Display detail page for a specific Genre.
exports.genre_detail = function (req, res, next) {
  async.parallel(
    {
      genre: (callback) => {
        Genre.findById(req.params.id).exec(callback);
      },
      genreBooks: (callback) => {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    (error, results) => {
      if (error) {
        return next(error);
      }
      if (results.genre == null) {
        // No results.
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      res.send({
        title: "Genre Detail",
        genre: results.genre,
        genreBooks: results.genreBooks,
      });
    }
  );
};
// Display Genre create form on GET.
exports.genre_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre create GET");
};

// Handle Genre create on POST.
exports.genre_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre create POST");
};

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre update POST");
};