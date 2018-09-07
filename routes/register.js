var express = require(express);
var router = express.router;

router.get('/', function(req, res, next){
    res.render('index');
});

router.post('/signUp', function(req, res, next){
      console.log(req.body.firstName);
    res.render('index', alert('you are now registered'));
});

// app.get('/',
//   function(req, res) {
//     res.render('index', { user: req.user });
//   });

// app.post('/signUp', function(req, res){
//   console.log("------------------");
//   console.log(req.body.$("#firstName");
//   console.log("------------------");

//   res.render('index', alert("you are now registered!"));
// });