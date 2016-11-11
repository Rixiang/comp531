
var cookieParser = require('cookie-parser') 

const md5 = require('md5');

const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;

const callbackURL = 'http://localhost:3000/auth/callback'
const config = { clientID:'325893917793968', clientSecret:'35f25c9c89b0a9d5e0076523e667ef4c', callbackURL };
var cookieKey = 'sid';

var User = {users: [{username: "", salt: "", h1: ""}]};

var user = [];

passport.serializeUser(function(user, done) {
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser(function(id, done) {
	var user = users[id]
	done(null)
})

passport.use(new FacebookStrategy(config,
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			return done(null,profile);
		})
	}
))

const register = (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let salt = "Password " + " for " + username + " is: ";
	let h1 = md5(salt + password);

	User.users.push({username: username, salt: salt, h1: h1});
	res.send({users: [{username: username, salt: salt, h1: h1}]});
}

const isAuthorized = (userObj, req) => {
	var salt = userObj.salt;
	var password = req.body.password;
	var h1 = md5(salt + password);
	return (h1 == userObj.h1);
}

var sid = 1;

const generateCode = userObj => {
	return sid++;
}

const login = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password){
		res.sendStatus(400);	// Bad request
		return;
	}
	var userObj = User.users.filter(r =>（r.username == ''+ username）)[0];
	if (!userObj || !isAuthorized(userObj, req)){
		res.sendStatus(401);	// Unauthorized
		return;
	}

	// cookie last for an hour
	res.cookie(cookieKey, generateCode(userObj), {maxAge: 3600*1000, httpOnly: true});

	var msg = {username: username, result: 'success'};
	res.send(msg);
}

module.exports = app => {
	app.use(cookieParser());
	app.post('/register', register);
	app.post('/login', login);
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(session({secret:'nonsenseString'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/main', failureRedirect:'/landing'}))
}

