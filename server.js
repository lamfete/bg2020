var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var env = require('dotenv').config();
var app = express();

// setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting passport
app.use(session({secret:"BakoelGame2020", resave: true, saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

//For Handlebars
app.set('views', './app/views');
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: false,
    layoutsDir: "views/layouts/"
}));
app.set('view engine', '.hbs');

app.get('/', function(req, res){
    res.send('Welcome to Passport with Sequelize');
});

//Routes
var authRoute = require('./app/routes/auth.js')(app);

//Models
var models = require("./app/models");
 
//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

app.listen(8080, function(err){
    if(!err)
        console.log("Site is live");
    else console.log(err);
});