const async = require("async");
const {
  body,
  validationResult,
  check,
} = require("express-validator");
const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

exports.index = function (req, res) {
  async.parallel(
    {
      book_count(callback) {
        Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        // countDocuments не работает, работает только просто count
      },
      book_instance_count(callback) {
        BookInstance.countDocuments({}, callback);
      },
      book_instance_available_count(callback) {
        BookInstance.countDocuments(
          {
            status: "Available",
          },
          callback
        );
      },
      author_count(callback) {
        Author.countDocuments({}, callback);
      },
      genre_count(callback) {
        Genre.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.send({
        title: "Local Library Home",
        data: results,
      });
    }
  );
};

// Display list of all books.
exports.book_list = function (req, res, next) {
  Book.find({}, "title author")
    .populate("author")
    .exec((err, bookList) => {
      if (err) {
        return next(err);
      }

      if (bookList.length === 0) {
        return res.status(200).json({
          bookList: [],
          title: "Список книг пуст создайте книгу ...",
        });
      }

      res.send({
        title: "Book List",
        bookList,
      });
    });
};

// Display detail page for a specific book.
exports.book_detail = function (req, res, next) {
  async.parallel(
    {
      bookInfo: (callback) => {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      bookCopy: (callback) => {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    (error, results) => {
      if (results.bookInfo == null) {
        const err = new Error("Book not found");
        err.status = 404;
        return res.status(404).json({ err });
      }

      if (error) {
        return next(error);
      }

      res.send({
        title: results.bookInfo.title,
        book: results.bookInfo,
        bookCopy: results.bookCopy,
      });
    }
  );
};

// Display book create form on GET.
exports.book_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// Handle book create on POST.
exports.book_create_post = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },
  body("isbn", "ISBN must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summaru must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    book.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(book);
    });
  },
];

exports.book_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
exports.book_delete_post = function (req, res, next) {
  async.parallel(
    {
      bookCopy: (callback) => {
        BookInstance.find({ book: req.body.id }).exec(callback);
      },
      book: (callback) => {
        Book.findById(req.body.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.bookCopy.length > 0) {
        BookInstance.deleteMany({ book: req.body.id }, () => {
          if (err) {
            return next(err);
          }
        });
      }

      if (results.book) {
        Book.findByIdAndDelete({ _id: req.body.id }, () => {
          if (err) {
            return next(err);
          }
        });
      }
    }
  );
};

// Display book update form on GET.
exports.book_update_get = function (req, res) {
  async.parallel(
    {
      book(callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      authors(callback) {
        Author.find(callback);
      },
      genres(callback) {
        Genre.find(callback);
      },
    },
    (err, results, next) => {
      if (err) {
        return res.status(404).json({ title: "Not found" });
      }
      if (results.book == null) {
        return res.status(400).json({ errors: err });
      }
      // Success.
      // Mark our selected genres as checked.
      for (
        let iterGenre = 0;
        iterGenre < results.genres.length;
        iterGenre++
      ) {
        for (
          let iterBookGenre = 0;
          iterBookGenre < results.book.genre.length;
          iterBookGenre++
        ) {
          if (
            results.genres[iterGenre]._id.toString() ===
            results.book.genre[iterBookGenre]._id.toString()
          ) {
            results.genres[iterGenre].checked = "true";
            console.log(results.genres[iterGenre]);
          }
        }
      }
      res.json({
        title: "Update Book",
        authors: results.authors,
        genres: results.genres,
        book: results.book,
      });
    }
  );
};

// Handle book update on POST.
exports.book_update_post = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },

  body("isbn", "ISBN must not be empty")
    .isLength({ min: 1 })
    .trim()
    .escape(),
  body("summary", "Summary must not be empty.")
    .isLength({ min: 1 })
    .trim()
    .escape(),
  body("title", "Title must not be empty.")
    .isLength({ min: 1 })
    .trim()
    .escape(),
  body("author", "Author must not be empty.")
    .isLength({ min: 1 })
    .trim()
    .escape(),
  check("genre.*").trim().escape(),
  (req, res, next) => {
    console.log(req.params.id);

    const errors = validationResult(req);
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre:
        typeof req.body.genre === "undefined" ? [] : req.body.genre,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Book.findByIdAndUpdate(
      req.params.id,
      book,
      {},
      (err, thebook) => {
        if (err) {
          return next(err);
        }
        // Successful - redirect to book detail page.
        res.status(200).send(thebook);
      }
    );
  },
];
