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
    app.get("/api/category", function (req, res) {
        var query = {};
        if (req.query.author_id) {
            query.AuthorId = req.query.author_id;
        }
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Category.findAll({
            where: query,
            include: [db.Author]
        }).then(function (dbCategory) {
            res.json(dbCategory);
        });
    });


    // Get route for retrieving a single post
    app.get("/api/category/:id", function (req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Category.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Author]
        }).then(function (dbCategory) {
            res.json(dbCategory);
        });
    });


    // POST route for saving a new post
    // app.post("/api/category", function (req, res) {
    //     db.Category.create({
    //         title: req.body.title,
    //         // body: req.body.body,
    //         // category: req.body.category
    //     }).then(function (dbCategory) {
    //         res.json(dbCategory);
    //         // });
    //         // db.Author.create({
    //         //     name: req.body.name
    //         // }).then(function(dbAuthor){
    //         //     res.json(dbAuthor);
    //         // });

    //     //     db.Category.create({
    //     //         title: req.body.title
    //     //     }).then(function(dbCategory){
    //     //         res.json(dbCategory);
    //     // });
    // });
    // });

    // DELETE route for deleting posts
    app.delete("/api/category/:id", function (req, res) {
        db.Category.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbCategory) {
            res.json(dbCategory);
        });
    });

    // PUT route for updating posts
    app.put("/api/category", function (req, res) {
        db.Category.update({
            title: req.body.title,
        }, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbCategory) {
                res.json(dbCategory);
            }).catch(function (dbCategory) {
                res.json(err);
            });
    });
};

