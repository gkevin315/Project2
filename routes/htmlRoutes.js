var db = require("../models");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var orm = require('../db/orm.js');
var path = require("path");

//Setting the strategy for Passport
passport.use(new LocalStrategy({ passReqToCallback: true },
	function (req, username, password, done) {

		//Searching the ORM for the user in the database
		orm.findUser(username, function (err, user) {
			user = user[0];
			if (err) { return done(err); }
			if (!user) { return done(null, false); }

			//comparing user passwords - return if not a match
			if (password !== user.password) { return done(null, false); }

			return done(null, user);
		});
	}
));

//These two methods are required to keep the user logged in via the session
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

module.exports = function (app) {

	//GETs

	app.get('/', function (req, res) {

		db.Post.findAll({}).then(function (dbPosts) {
			res.render("index", {
				msg: "Welcome!",
				welcomeText: "Sign In",
				actionBtn: 'signin',
				otherAction: "Signup",
				post: dbPosts
			});
		});
	});

	app.get("/post/:id", function (req, res) {
		db.Post.findOne({
			where: {
				id: req.params.id
			}
		}).then(function (dbPost) {
			res.render("post", {
				post: dbPost
			});
		});
	});

	app.get("/post/:category", function(req, res){
		db.Category.findOne({
			where: {category: req.params.id}
		}).then(function(dbPost){
			res.render('post', {
		post: dbPost})
		})
	})


	app.get("/author/:id", function (req, res) {
		db.Author.findOne({ where: { id: req.params.id } }).then(function (dbAuthor) {
			res.render("author", {
				author: dbAuthor
			});
		});
	});

	app.get('/login', function (req, res) {
		res.redirect('/')
	});

	app.get('/signup', function (req, res) {
		res.render('index', {
			welcomeText: "Sign Up",
			actionBtn: 'signup',
			otherAction: "Signin"
		});
	});

	app.get('/authenticated', function (req, res) {
		if (req.isAuthenticated()) {
			res.render('authenticated', {
				username: req.user.username

			})
		} else {
			res.redirect('/')
		}
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	//POSTs

	app.post('/login', passport.authenticate('local', { failureRedirect: '/', failureFlash: 'Wrong Username or Password' }), function (req, res) {
		res.redirect('/authenticated');
	});

	app.post('/signup', function (req, res) {
		var user = new UserModel(req.body);
		UserModel.saveUser(user, function (status) {
			if (!status) {
				res.redirect('/signup')
				return false
			}
			res.redirect('/');
		});
	});

};

