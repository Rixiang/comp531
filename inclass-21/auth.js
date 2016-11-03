
var User = {users: [{username: "", salt: "", h1: ""}]};

var cookieParser = require('cookie-parser') 

const md5 = require('md5');

var cookieKey = 'sid';

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
	var userObj = User.users.filter(r => { return r.username == ''+ username})[0];
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
}