var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

// setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting passport
app.use(session({secret:"BakoelGame2020", resave: true, saveUninitialized: true})) // session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

app.get('/', function(req, res){
    res.send('Welcome to Passport with Sequelize');
});

app.listen(8080, function(err){
    if(!err)
        console.log("Site is live");
    else console.log(err);
});