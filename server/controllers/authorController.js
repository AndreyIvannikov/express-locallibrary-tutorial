const async = require("async");
const { body, validationResult } = require("express-validator");
const Author = require("../models/author");
const Book = require("../models/book");

// Показать список всех авторов.
exports.author_list = function (req, res, next) {
  Author.find()
    .sort([["family_name", "ascending"]])
    .exec((err, authorList) => {
      if (err) {
        next(err);
      }
      res.send({ authorList });
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
      if (result.author === null) {
        const error = new Error("Author not found");
        error.status = 404;
        return next(error);
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
      console.log(author);
      if (err) {
        return next(err);
      }
      res.send({ title: "Данные сохраненны" });
    });
  },
];

// Показать форму удаления автора по запросу GET.
exports.author_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Удалить автора по запросу POST.
exports.author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Показать форму обновления автора по запросу GET.
exports.author_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Обновить автора по запросу POST.
exports.author_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update POST");
};
