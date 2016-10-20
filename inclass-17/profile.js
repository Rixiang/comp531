var headlines = {headlines:[
	{username: 'xl68', headline: 'one headline'}]};

var emails = {emails:[
	{username: 'xl68', email: 'xl68@rice.edu'}]};

var zipcodes = {zipcodes:[
	{username: 'xl68', zipcode: '77005'}]};

var avatars = {avatars:[
	{username: 'xl68', avatar: 'www.rice.edu'}]};


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

module.exports = app => {
     app.get('/headlines/:users?', getHeadline);
     app.put('/headline', putHeadline);
     app.get('/email/:users?', getEmail);
     app.put('/email', putEmail);
     app.get('/zipcode/:users?', getZipcode);
     app.put('/zipcode', putZipcode);
     app.get('/avatars/:users?', getAvatar);
     app.put('/avatar', putAvatar);
}
