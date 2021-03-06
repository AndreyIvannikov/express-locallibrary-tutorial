const { body, validationResult } = require("express-validator");
const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");
// Display list of all BookInstances.
exports.bookinstance_list = function (req, res, next) {
  BookInstance.find()
    .populate("book")
    .exec((err, bookListInsAll) => {
      if (err) {
        return next(err);
      }
      res.send({
        bookListInsAll,
        title: "Book Instance List",
      });
    });
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function (req, res, next) {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec((err, bookinstance) => {
      if (err) {
        return next(err);
      }
      res.send({
        title: `Copy: ${bookinstance.book.title}`,
        bookinstance,
      });
    });
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};

exports.bookinstance_create_post = [
  body("book", "Book must be specified")
    .isLength({ min: 1 })
    .trim()
    .escape(),
  body("imprint", "Imprint must be specified")
    .isLength({ min: 1 })
    .trim()
    .escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601(),
  body("status").trim().escape(),

  // Sanitize fields.
  body("data").toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.date,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      Book.find({}, "title").exec((err, books) => {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        res.send({
          title: "Create BookInstance",
          book_list: books,
          selected_book: bookinstance.book._id,
          errors: errors.array(),
          bookinstance,
        });
      });
    } else {
      // Data from form is valid.
      bookinstance.save((err) => {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new record.
        res.redirect(bookinstance.url);
      });
    }
  },
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = () => {
  console.log(2);
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
