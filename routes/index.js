var express = require("express"),
	router  = express.Router(),
	passport = require("passport"),
	User = require("../models/user");

//Root route

router.get("/", function(req, res) {
	res.render("landing");
});

router.get("/about", function(req, res) {
	res.render("about");
});

router.get("/contact", function(req, res) {
	res.render("contact");
});

router.get("/services", function(req, res) {
	res.render("services");
});

router.get("/faq", function(req, res) {
	res.render("faq");
});

router.get("/readMore", function(req, res) {
	res.render("readMore");
});

router.get("/login", function(req, res) {
	res.render("login");
});

router.get("/signup", function(req, res) {
	res.render("signup");
});

//ADMIN ROUTES
router.get("/signupAdmin", function(req, res) {
	res.render("admin");
});

router.get("/dashboard", isAdmin, function(req, res) {
	User.find({}, function(err, Users) {
		if(err) {
			res.redirect("back");
		}
		res.render("dashboard", {allUsers: Users});
	});
});

//ADMIN ROUTES END

//HANDLE SIGN UP LOGIC
router.post("/signup", function(req, res) {
	var newUser = new User({username: req.body.username, name: req.body.name, email: req.body.email});
    if(req.body.adminCode === "CreativeLabs") {
      newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user) {
    	if(err){
            console.log(err);
            return res.render("signup", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/");
        });
    });
});

//HANDLE LOG IN LOGIC
router.post("/login", loggedIn, passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "signup"
}), function(req, res) {});

//LOGGING OUT
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

//SHOWING PROFILE ROUTE MUST STAY BELOW LOGOUT ROUTE (OTHERWISE USER CAN'T LOG OUT)
router.get("/:id", isLoggedIn, function(req, res) {
	//Check if accessing someone else's profile
	var urlUser = "/";
	urlUser += req.user.id;
	User.findById(req.url.substr(1)).exec(function(err, owner) {
		if(err) {
			console.log(err);
			res.redirect("back");
		}
		if(!owner) {
			console.log("Profile not found");
			res.redirect("back");		//TODO: For debugging purposes
		}
		console.log(owner);
		res.render("profile", {owner: owner});
	});
});

//ADDING PHOTOS TO USER PROFILE
router.post("/profile", isLoggedIn, isAdmin, function(req, res) {
	console.log("");
	res.redirect("back");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

function isAdmin(req, res, next) {
	if(req.user && req.user.isAdmin) {
		next();
	} else {
		res.redirect("back");
	}
};

function loggedIn(req, res, next) {
	if(!req.user) {
		next();
	}
	else {
		console.log("Already logged in");
		res.redirect("back");
	}
}

module.exports = router;



