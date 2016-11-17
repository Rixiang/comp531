'use strict'

const uploadImage = require('./uploadCloudinary').uploadImage;

var headlines = {headlines:[
	{username: 'xl68', headline: 'one headline'}]};

var emails = {emails:[
	{username: 'xl68', email: 'xl68@rice.edu'}]};

var zipcodes = {zipcodes:[
	{username: 'xl68', zipcode: '77005'}]};

var avatars = {avatars:[
	{username: 'xl68', avatar: 'www.rice.edu'}]};

let articles = [
		{ id:1, author: 'Scott', text:'A post'}, 
      	{ id:2, author: 'Xiang', text:'Another post' }, 
      	{ id:3, author: 'Michael', text:'Another post' }];

const getHeadline = (req, res) => {
    res.send(headlines.headlines.filter(r => r.username == req.params.users));
}

const putHeadline = (req, res) => {
	headlines.headlines.map(r => {
		if (r.username == req.body.username){
			r.headline = req.body.headline;
		}
	});
	res.send(headlines.headlines.filter(r => r.username == req.body.username));
}

const getEmail= (req, res) => {
    res.send(emails.emails.filter(r => r.username == req.params.users));
}

const putEmail = (req, res) => {
	emails.emails.map(r => {
		if (r.username == req.body.username){
			r.email = req.body.email;
		}
	});
	res.send(emails.emails.filter(r => r.username == req.body.username));
}

const getZipcode= (req, res) => {
    res.send(zipcodes.zipcodes.filter(r => r.username == req.params.users));
}

const putZipcode = (req, res) => {
	zipcodes.zipcodes.map(r => {
		if (r.username == req.body.username){
			r.zipcode = req.body.zipcode;
		}
	});
	res.send(zipcodes.zipcodes.filter(r => r.username == req.body.username));
}

const getAvatar= (req, res) => {
    res.send(avatars.avatars.filter(r => r.username == req.params.users));
}

const putAvatar = (req, res) => {
	avatars.avatars.map(r => {
		if (r.username == req.body.username){
			r.avatar = req.body.avatar;
		}
	});
	res.send(avatars.avatars.filter(r => r.username == req.body.username));
}

const getArticle = (req, res) => {
	if(req.params.id){
    	res.send({articles: articles.filter((r) => { return r.id == req.params.id})});
    }else{
    	res.send({articles: articles});
    }
}


const index = (req, res) => {
     res.send({ hello: 'world' })
}


const addArticle = (req, res) => {
    let id = articles.length + 1;
    articles.push({id:id, author: 'Xiang', text: req.body.text});  
    res.send({'articles': [{id:id, author: 'Xiang', text: req.body.text}]});
}

const uploadAvatar = (req, res) => {
	if (req.fileurl == '' || req.fileurl == null){
		res.status(401).send("Error when upload avatar")
	}else{
	   const image = cloudinary.image(req.fileid, {
	       format: "png", width: 100, height: 130, crop: "fill" 
	   })
	   // create a response to the user's upload
	   res.status(200).send(`Uploaded: ${req.fileurl}<br/><a href="${req.fileurl}">${image}</a>`);
	}
}

module.exports = app => {
	 app.get('/', index);
     app.get('/headlines/:users?', getHeadline);
     app.put('/headline', putHeadline);
     app.get('/email/:users?', getEmail);
     app.put('/email', putEmail);
     app.get('/zipcode/:users?', getZipcode);
     app.put('/zipcode', putZipcode);
     app.get('/avatars/:users?', getAvatar);
     //app.put('/avatar', putAvatar);
     app.get('/articles/:id*?', getArticle);
	 app.post('/article', addArticle);
	 app.put('/avatar', uploadImage('avatar'), uploadAvatar);
}
