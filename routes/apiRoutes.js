var db = require("../models");

module.exports = function (app) {
  // Get all authors
  app.get("/api/authors", function (req, res) {
    db.Author.findAll({}).then(function (dbAuthors) {
      res.json(dbAuthors);
    });
  });

  // Get one example
  app.get("/api/authors/:id", function (req, res) {
    db.Author.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });

  // Create a new example
  app.post("/api/authors", function (req, res) {
    db.Author.create(req.body).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });

  // Delete an example by id
  app.delete("/api/authors/:id", function (req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });

};
