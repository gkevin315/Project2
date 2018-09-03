// Dependencies
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var db = require("./models");
var orm = require('./db/orm.js');
var app = express();
var PORT = process.env.PORT || 8080;
var passport = require('passport');
// var Strategy = require('passport-local').Strategy;


//Handlebars-------------------------------------------------------
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//-----------------------------------------------------------------

//Middleware-------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


// Routes
require("./routes/author-api-routes.js")(app);
require("./routes/htmlRoutes.js")(app);
require("./routes/post-api-routes.js")(app);

//password middleware methods
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

//routes
require('./routes/htmlRoutes.js')(app);


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

orm.connectToDB();

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
