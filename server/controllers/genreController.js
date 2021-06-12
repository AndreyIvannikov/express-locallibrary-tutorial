const async = require("async");
const { body, validationResult } = require("express-validator");
const Genre = require("../models/genre");
const Book = require("../models/book");
const author = require("../models/author");

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
      if (results.genre == null) {
        const err = new Error("Genre not found");
        err.status = 404;
        return res.status(404).json({ err });
      }
      if (error) {
        return next(error);
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
exports.genre_create_post = [
  body("name", "Имя не может быть пустым")
    .trim()
    .escape()
    .isLength({ min: 1 }),

  (req, res, next) => {
    const error = validationResult(req);
    const genre = new Genre({ name: req.body.name });

    if (!error.isEmpty()) {
      return res.status(400).json({
        title: "Create Genre",
        genre,
        errors: error.array(),
      });
    }

    Genre.findOne({ name: req.body.name }).exec((err, foundGenre) => {
      if (err) {
        return res.status(404).json({ title: "Не найдено" });
      }

      if (foundGenre) {
        return res.status(400).json({
          title: "Create Genre",
          genre,
          errors: [{ msg: "Такие данные уже добавленны" }],
        });
      }
      genre.save((saveErr) => {
        if (saveErr) {
          return next(saveErr);
        }
        res.send({ title: "Данные сохраненны" });
      });
    });
  },
];

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res, next) {
  async.parallel(
    {
      genre: (callback) => {
        Genre.findById(req.body.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return res.status(404).json({ errors: err });
      }

      if (results.genre) {
        console.log(results.genre);
        Genre.findByIdAndDelete({ _id: req.body.id }, () => {
          if (err) {
            return next(err);
          }
          res
            .status(200)
            .json({ title: "success", genre: results.genre });
        });
      }
    }
  );
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// Handle Genre update on POST.
exports.genre_update_post = [
  body("name", "name is note empty")
    .isLength({ min: 2 })
    .trim()
    .escape(),
  (req, res, next) => {
    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id,
    });
    console.log(req.params.id);
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    Genre.findByIdAndUpdate(
      req.params.id,
      genre,
      {},
      (err, theGenre) => {
        if (err) {
          return res.status(400).send({ errors: err });
        }
        // Successful - redirect to book detail page.
        res.status(200).send(theGenre);
      }
    );
  },
];
