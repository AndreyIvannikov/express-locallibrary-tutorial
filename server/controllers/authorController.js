const async = require("async");
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
exports.author_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create POST");
};

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
