const async = require("async");
const { body, validationResult } = require("express-validator");
const Author = require("../models/author");
const Book = require("../models/book");

// Показать список всех авторов.
exports.author_list = function (req, res, next) {
  Author.find()
    .sort([["family_name", "ascending"]])
    .exec((err, authors) => {
      if (err) {
        return next(err);
      }
      if (authors.length === 0) {
        return res.status(200).json({
          authors: [],
          title: "Список авторов пуст создайте первого автора ...",
        });
      }
      res.send({ authors });
    });
};

// Показать подробную страницу для данного автора.
exports.author_detail = function (req, res, next) {
  async.parallel(
    {
      author: (callback) => {
        Author.findById(req.params.id).exec(callback);
      },
      authorBook: (callback) => {
        Book.find({ author: req.params.id }).exec(callback);
      },
    },
    (err, result) => {
      if (err) {
        return next(err);
      }

      res.send({
        title: "Author Detail",
        author: result.author,
        authorBooks: result.authorBook,
      });
    }
  );
};

// Показать форму создания автора по запросу GET.
exports.author_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create GET");
};

// Создать автора по запросу POST.
exports.author_create_post = [
  body("firstName")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Необходимо указать имя")
    .isAlphanumeric()
    .withMessage("Имя должно состоять из буквенных симоволов"),

  body("lastName")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Необходимо указать фамилию")
    .isAlphanumeric()
    .withMessage("Фамилия должно состоять из буквенных симоволов"),

  body("dateOfBirth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  body("dateOfDeath", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {
    const error = validationResult(req.body);

    if (!error.isEmpty()) {
      return res.status(400).json({
        title: "Create Genre",
        author: req.body,
        errors: error.array(),
      });
    }
    const author = new Author({
      first_name: req.body.firstName,
      family_name: req.body.lastName,
      date_of_birth: req.body.dateOfBirth,
      date_of_death: req.body.dateOfDeath,
    });
    author.save((err) => {
      if (err) {
        return next(err);
      }
      res.send({ title: "Данные сохраненны" });
    });
  },
];

// Показать форму удаления автора по запросу GET.
exports.author_delete_get = function (req, res, next) {
  async.parallel(
    {
      author: (callback) => {
        Author.findById(req.params.id).exec(callback);
      },
      book: (callback) => {
        Book.find({ author: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }

      if (results.author == null) {
        return next(err);
      }
      res.json({
        title: "Delete Author",
        author: results.author,
        book: results.book,
      });
    }
  );
};

// Удалить автора по запросу POST.
exports.author_delete_post = function (req, res, next) {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.body.id).exec(callback);
      },
      authors_books(callback) {
        Book.find({ author: req.body.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (results.authors_books.length > 0) {
        // Автор книги. Визуализация выполняется так же, как и для GET route.
        res.send({
          title: "Delete Author",
          author: results.author,
          author_books: results.authors_books,
        });
      } else {
        // У автора нет никаких книг. Удалить объект и перенаправить в список авторов.
        Author.findOneAndDelete({ _id: req.body.id }, (err) => {
          if (err) {
            return next(err);
          }
        });
      }
    }
  );
};

// Показать форму обновления автора по запросу GET.
exports.author_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Обновить автора по запросу POST.
exports.author_update_post = [
  body("firstName")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Необходимо указать имя")
    .isAlphanumeric()
    .withMessage("Имя должно состоять из буквенных симоволов"),

  body("lastName")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Необходимо указать фамилию")
    .isAlphanumeric()
    .withMessage("Фамилия должно состоять из буквенных симоволов"),

  body("dateOfBirth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  body("dateOfDeath", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  (req, res, next) => {
    const errors = validationResult(req);
    const author = new Author({
      first_name: req.body.firstName,
      family_name: req.body.lastName,
      date_of_birth: req.body.dateOfBirth,
      date_of_death: req.body.dateOfDeath,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Author.findByIdAndUpdate(
      req.params.id,
      author,
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
