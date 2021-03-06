// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the posts
    app.get("/api/posts", function (req, res) {
        var query = {};
        if (req.query.author_id) {
            query.AuthorId = req.query.author_id;
        }
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Post.findAll({
            where: query,
            include: [db.Author]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    // app.get("/api/posts/:category", function(req, res) {
    //     // Add sequelize code to find all posts where the category is equal to req.params.category,
    //     // return the result to the user with res.json
    //     db.Post.findAll({
    //       where: {
    //       category: req.params.category
    //       }
    //     }).then(function(dbPost){
    //       res.json(dbPost);
    //     });
    //   });


    // Get route for retrieving a single post
    app.get("/api/posts/:id", function (req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Post.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Author, db.Category]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    app.get("/api/posts/category/:id", function (req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Post.findAll({
            where: {
                id: req.params.id
            },
            include: [db.Author, db.Category]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });


    // POST route for saving a new post
    app.post("/api/posts", function (req, res) {
        db.Post.create({
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,

            include: [db.Author, db.Category]
        }).then(function (dbPost) {
            res.json(dbPost);
            // });
            // db.Author.create({
            //     name: req.body.name
            // }).then(function(dbAuthor){
            //     res.json(dbAuthor);
            // });

        //     db.Category.create({
        //         title: req.body.title
        //     }).then(function(dbCategory){
        //         res.json(dbCategory);
        // });
    });
    });

    // DELETE route for deleting posts
    app.delete("/api/posts/:id", function (req, res) {
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    // PUT route for updating posts
    app.put("/api/posts", function (req, res) {
        db.Post.update({
            title: req.body.title,
            body: req.body.body,
            category: req.body.category
        }, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
                res.json(dbPost);
            }).catch(function (dbPost) {
                res.json(err);
            });
    });
};


