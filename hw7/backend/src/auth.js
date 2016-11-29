const cookieParser = require('cookie-parser') 
const md5 = require('md5');

//const FacebookStrategy = require('passport-facebook').Strategy;
//const callbackURL = 'http://localhost:3000/auth/callback'
//const config = { clientID:'325893917793968', clientSecret:'35f25c9c89b0a9d5e0076523e667ef4c', callbackURL };

var redis = require('redis').createClient("redis://h:p29daffkh013a88h1pij5v3s6vv@ec2-23-21-147-124.compute-1.amazonaws.com:11169");

var User = require('./model.js').User;
var Email = require('./model.js').Email;
var Zipcode = require('./model.js').Zipcode;
var Dob = require('./model.js').Dob;
var Avatar = require('./model.js').Avatar;
var Password = require('./model.js').Password;
var Headline = require('./model.js').Headline;
var Following = require('./model.js').Following;

const cookieKey = 'sid';

const register = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const dob = req.body.dob;
	console.log(dob);
	const zipcode = req.body.zipcode;
	const avatar = "https://raw.githubusercontent.com/Rixiang/comp531/master/hw3/dist/pipi.jpg";
	const headline = "Becoming a web developer!"
	const password = req.body.password;
	const salt = md5("Password " + " for " + username + " is: ");
	const h1 = md5(salt + password);
	const newUser = {username: username, salt: salt, h1: h1};
	User.create(newUser, (error, doc) => {
		if (error) return res.status(500).send({ error: error });
		Email.create({username: username, email: email}, (error, doc) => {
			if (error) return res.status(500).send({ error: error });
			Zipcode.create({username: username, zipcode: zipcode}, (error, doc) => {
				if (error) return res.status(500).send({ error: error });
				Dob.create({username: username, dob: dob}, (error, doc) => {
					if (error) return res.status(500).send({ error: error });
					Avatar.create({username: username, avatar: avatar}, (error, doc) => {
						if (error) return res.status(500).send({ error: error });
						Headline.create({username: username, headline: headline}, (error, doc) => {
							if (error) return res.status(500).send({ error: error });
							Following.create({username: username, following: []}, (error, doc) => {
								if (error) return res.status(500).send({ error: error });
							});
						});
					});
				});
			});
		});
        return res.status(200).send({result: 'success', username: doc.username});
    }); 
}

const isAuthorized = (userObj, req) => {
	const salt = userObj.salt;
	const password = req.body.password;
	const h1 = md5(salt + password);
	return (h1 == userObj.h1);
}

const login = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password){
		return res.sendStatus(400);	// Bad request
	}
	User.find({username: username}, (error, docs) => {
		const userObj = docs[0];
		if (!userObj || !isAuthorized(userObj, req)){
			return res.sendStatus(401);	// Unauthorized
		}
		const sessionKey = md5("Session key for " + userObj.username + " at " + new Date().getTime());
		redis.hmset(sessionKey, userObj);
		res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true}); // cookie last for an hour
		const msg = {username: username, result: 'success'};
		return res.status(200).send(msg);
	});
}

const isLoggedIn = (req, res, next) => {
	const sid = req.cookies[cookieKey];
	if (!sid){
        return res.status(401).send('Not Authorized');
    }
    redis.hgetall(sid, (error, userObj) => {
    	if(error) {
    		console.error('Error: ${err}');
    	}else if(userObj){
    		console.log(sid + ' mapped to ' + userObj.username);
    		req.username = userObj.username;
			return next();
		}else{
			return res.redirect('/login');
		}
    })
}

const logout = (req, res) => {
	const sid = req.cookies[cookieKey];
	redis.del(sid);
	res.clearCookie(cookieKey);
	res.status(200).send("OK");
}


const remove = (req, res) => {
	const username = req.body.username ? req.body.username : req.username;
	User.remove({username: username}, (error, doc) => {
		if (error) return res.status(500).send({ error: error });
		Email.remove({username: username}, (error, doc) => {
			if (error) return res.status(500).send({ error: error });
			Zipcode.remove({username: username}, (error, doc) => {
				if (error) return res.status(500).send({ error: error });
				Dob.remove({username: username}, (error, doc) => {
					if (error) return res.status(500).send({ error: error });
					Avatar.remove({username: username}, (error, doc) => {
						if (error) return res.status(500).send({ error: error });
						Headline.remove({username: username}, (error, doc) => {
							if (error) return res.status(500).send({ error: error });
							Following.remove({username: username}, (error, doc) => {
								if (error) return res.status(500).send({ error: error });
							});
						});
					});
				});
			});
		});
	});
    return res.sendStatus(200);
}


module.exports = app => {
	app.use(cookieParser());
	app.post('/register', register);
	app.post('/login', login);
	app.use(isLoggedIn);
	app.put('/logout', logout);
	app.delete('/remove', remove);
}