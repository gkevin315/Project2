exports.users = require('./users');

var express = require('express');
var app = express.Router();

app.get('/signUp', function(req, res){
    res.render('index', {title: 'sign up!'});
});

app.post('/signUp', function(req, res){

    console.log(req.body.firstName);
    console.log(req.body.lastName);
     
        const db = require("../db.js");
     
        db.query('INSERT INTO FirstName, LastName, Email, Password, PassMatch) VALUES (?, ?, ?, ?, ?)', 
        [fName, lName, email, password, passMatch], function(err, results, fields){
         if (error) throw error;
        
     
        res.render('signUp', {title: 'Registration Complete'});
        });
      });


module.exports = app;