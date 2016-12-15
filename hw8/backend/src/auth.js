const cookieParser = require('cookie-parser') 
const md5 = require('md5');
const session = require('express-session');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = { clientID:'1797238227212606', clientSecret:'bb913812420b59eeda400e8b7c718247', 
	callbackURL: 'https://mysterious-scrubland-92641.herokuapp.com/facebook/callback', profileFields: ['emails', 'name', 'displayName', 'photos'] };

var redis = require('redis').createClient("redis://h:pfs8m2o22dohao5jk1448920amg@ec2-54-221-241-163.compute-1.amazonaws.com:14439");

var User = require('./model.js').User;
var Email = require('./model.js').Email;
var Zipcode = require('./model.js').Zipcode;
var Dob = require('./model.js').Dob;
var Avatar = require('./model.js').Avatar;
var Password = require('./model.js').Password;
var Headline = require('./model.js').Headline;
var Following = require('./model.js').Following;

const cookieKey = 'sid';
let frontendUrl = '';

const register = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const dob = req.body.dob;
	const zipcode = req.body.zipcode;
	const avatar = "https://raw.githubusercontent.com/Rixiang/comp531/master/hw3/dist/pipi.jpg";
	const headline = "Becoming a web developer!"
	const password = req.body.password;
	const salt = md5("Password " + " for " + username + " is: ");
	const h1 = md5(salt + password);
	const newUser = {username: username, salt: salt, h1: h1};
	User.find({username: username}, (error, docs) => {
		if (error) return res.status(500).send({ error: error });
		if (docs[0]) return res.sendStatus(403); // Forbidden
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
		redis.hmset(sessionKey, userObj); // session management by Redis
		res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true}); // cookie last for an hour
		const msg = {username: username, result: 'success'};
		return res.status(200).send(msg);
	});
}

//use Facebook Strategy to login
let users = {};
passport.serializeUser((user, done) => {
	users[user.id] = user;
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	const user = users[id];
	done(null, user);
});

passport.use(new FacebookStrategy(config,
	(token, refreshToken, profile, done) => {
		//process.nextTick( (profile, done) => {
			//register the user in our system
			console.log("Object is " + JSON.stringify(profile));
			const username = profile['_json']['first_name']+ profile['_json']['last_name'] + "@facebook";
			const email = profile['_json']['email'];
			const avatar = profile['_json']['picture']['data']['url'];
			console.log("avatar is " + avatar);

			User.find({username: username}, (error, docs) => {
				const userObj = docs[0];
				if(!userObj){
					const newUser = {username: username, auth: "facebook"};
					User.create(newUser, (error, doc) => {
						if (error) return res.status(500).send({ error: error });
						Email.create({username: username, email: email}, (error, doc) => {
							if (error) return res.status(500).send({ error: error });
							Zipcode.create({username: username, zipcode: 00000}, (error, doc) => {
								if (error) return res.status(500).send({ error: error });
								Dob.create({username: username, dob: "06/04/1989"}, (error, doc) => {
									if (error) return res.status(500).send({ error: error });
									Avatar.create({username: username, avatar: avatar}, (error, doc) => {
											if (error) return res.status(500).send({ error: error });
											Headline.create({username: username, headline: "Login via Facebook"}, (error, doc) => {
												if (error) return res.status(500).send({ error: error });
												Following.create({username: username, following: []}, (error, doc) => {
													if (error) return res.status(500).send({ error: error });
												});
											});
										}
									);
								});
							});
						});
				    }); 
				}
			});
			return done(null, profile);
		//});
	})
);

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		const username = req.user['_json']['first_name']+ req.user['_json']['last_name'] + "@facebook";
		req.username = username;
		return next();
	}else{
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
}

const logout = (req, res) => {
	if (req.isAuthenticated()) {
		req.session.destroy();
		req.logout();
		return res.status(200).send("OK");
	} else{
		const sid = req.cookies[cookieKey];
		redis.del(sid);
		res.clearCookie(cookieKey);
		return res.status(200).send("OK");
	}
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

const findFrontend = (req, res, next) => {
	frontendUrl = req.headers.referer;
	next();
}

const fbLogIn = (req, res) => {
	res.redirect(frontendUrl);
}


module.exports = app => {
	app.use(cookieParser());
	app.use(findFrontend);
	app.post('/register', register);
	app.post('/login', login);
	app.use(session({secret:'secretSessionOfxl68', resave: false, saveUninitialized: false}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use('/login/facebook', passport.authenticate('facebook', {scope: 'email'}));
	app.use('/facebook/callback', passport.authenticate('facebook', {successRedirect: '/fbLogIn', failureRedirect:'/fail'}));
	app.use('/fbLogIn', fbLogIn);
	app.delete('/remove', remove);
	app.use(isLoggedIn);
	app.put('/logout', logout);
}