'use strict'

var Following = require('./model.js').Following;

const getFollowing = (req, res) => {
    const username = req.params.user ? req.params.user : req.username;
	Following.find({username: username}, (error, docs) => {
		if (!docs[0]) return res.sendStatus(400);
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({username: docs[0].username, following: docs[0].following});
    })
}

const putFollowing = (req, res) => {
	const userToAdd = req.params.user;
	const username = req.body.username ? req.body.username : req.username;
	const following = req.body.following || "";
	Following.findOneAndUpdate({username: username}, { $addToSet: { following: userToAdd }}, {upsert: true, new: true}, (error, doc) => {
		if (!doc) return res.sendStatus(400);
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({username: doc.username, following: doc.following});
    }); 

}

const deleteFollowing = (req, res) => {
	const userToDelete = req.params.user;
	const username = req.body.username ? req.body.username : req.username;
	Following.findOneAndUpdate({username: username}, { $pull: { following: userToDelete }}, {new: true }, (error, doc) => {
		if (!doc) return res.sendStatus(400);
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({username: doc.username, following: doc.following});
    }); 
}

module.exports = app => {
    app.get('/following/:user?', getFollowing);
    app.put('/following/:user', putFollowing);
    app.delete('/following/:user', deleteFollowing);
}