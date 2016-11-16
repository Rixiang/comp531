
var cookieParser = require('cookie-parser') 

const md5 = require('md5');


//const FacebookStrategy = require('passport-facebook').Strategy;

//const callbackURL = 'http://localhost:3000/auth/callback'
//const config = { clientID:'325893917793968', clientSecret:'35f25c9c89b0a9d5e0076523e667ef4c', callbackURL };
var cookieKey = 'sid';

var User = {users: [{username: "", salt: "", h1: ""}]};

var user = [];

// for session management
var redis = require('redis').createClient("redis://h:pc0m52hpsfm4ie3fcb3dr469of2@ec2-54-221-253-136.compute-1.amazonaws.com:10789");



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
	var userObj = User.users.filter(r => (r.username == ''+ username))[0];

	if (!userObj || !isAuthorized(userObj, req)){
		res.sendStatus(401);	// Unauthorized
		return;
	}

	redis.hmset(cookieKey, userObj);

	// cookie last for an hour
	res.cookie(cookieKey, generateCode(userObj), {maxAge: 3600*1000, httpOnly: true});

	var msg = {username: username, result: 'success'};
	res.send(msg);
}

const isLoggedIn = (req, res, next) => {
	var sid = req.cookie[cookieKey];
	if (!sid){
        return res.status(401).send('Not Authorized');
    }
    redis.hgetall(sid, function(err, userObj) {
    	console.log(sid + 'mapped to ' + userObj);
    	if(err) {
    		console.error('Error: ${err}');
    	}
    	if(userObj){
    		username = userObj.username;
			next();
		}
		else{
			res.redirect('/login');
		}
    })
}

const logout = (req, res) => {
	var sid = req.cookies[cookieKey];
	console.log("delete sid: " + sid);
	redis.del(sid);
	req.logout();
	req.redirect('/');
	res.status(200).send('OK');
}

module.exports = app => {
	app.use(cookieParser());
	app.post('/register', register);
	app.post('/login', login);
	app.put('/logout', isLoggedIn, logout);
}