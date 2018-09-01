var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Author.findAll({}).then(function(dbAuthors) {
      res.render("index", {
        msg: "Welcome!",
        authors: dbAuthors
      });
    });
  });

  app.get("/signup", function(req, res){
    res.render("signup");
  })

  app.get("/initial", function(req, res){
    res.render("initial");
  })

  // Load example page and pass in an example by id
  app.get("/author/:id", function(req, res) {
    db.Author.findOne({ where: { id: req.params.id } }).then(function(dbAuthor) {
      res.render("author", {
        author: dbAuthor
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
