var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    photos: [
    {
    	type: String
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);