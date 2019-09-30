var express               = require ("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    passport              = require("passport"),
    LocalStrategy         = require('passport-local'),
    mongoose              = require("mongoose"),
    User                  = require("./models/user"),
    cookieParser          = require("cookie-parser"),
    session               = require("express-session"),
    flash                 = require("connect-flash"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride        = require("method-override");


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// ASSIGN MONGOOSE PROMISE LIBRARY AND CONNECT TO DATABASE
mongoose.Promise = global.Promise;

const databaseUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1/elite_maintenance';

mongoose.connect(databaseUri, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.locals.moment = require('moment');
app.use(cookieParser('secret'));

//REQUIRE ROUTES
var indexRoutes = require("./routes/index.js");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "secretKey",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//PASS LOG IN STATUS TO OTHER EJS FILES
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


//USE ROUTES
app.use("/", indexRoutes);

//HOST LOCAL SERVER
app.listen(3000 , function () {
	console.log ("server is listening!!!");
 });





