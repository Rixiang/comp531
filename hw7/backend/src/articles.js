'use strict'

var Comment = require('./model.js').Comment;
var Article = require('./model.js').Article;
var Following = require('./model.js').Following;

const md5 = require('md5');

const getArticle = (req, res) => {
	const id = req.params.id;
    if(id){
		Article.findById(id, (error, doc) => {
			if (!doc) return res.sendStatus(400);
            if (error) return res.status(500).send({ error: error });
            res.status(200).send({articles: doc});
	   });
	}else{
		const username = req.username;
		let following = [username];
		Following.find({username: username}, (error, docs) => {
			if (!docs[0]) return res.sendStatus(400);
			if (error) return res.status(500).send({ error: error });
			docs[0].following.forEach(d =>{following.push(d)});
			// fetch articles
			Article.find({author: {$in: following}}, (error, docs) => {
				if (error) return res.status(500).send({ error: error });
		        let articles = {articles: []};
		        docs.forEach(doc => {articles.articles.push(doc)});
		        return res.status(200).send(articles);
	    	});
	    });	
    }
}

const putArticle = (req, res) => {
	const articleId = req.params.id;
	const commentId = req.body.commentId;
	const username = req.body.username ? req.body.username : req.username;
	const text = req.body.text || "";
	const date = new Date();
    let articles = {articles: []};
	if (!commentId){					// update article
		Article.findByIdAndUpdate(articleId, { $set: {text: text}}, {new: true}, (error, doc) => {
			if (!doc) return res.sendStatus(400);
			if (error) return res.status(500).send({ error: error });
	        articles.articles.push(doc);
	        return res.status(200).send(articles);
    	}); 
	}else if (commentId != -1){			// update comment
		Comment.findOneAndUpdate({commentId: commentId}, { $set: { text: text }}, (error, doc) => {
			if (!doc) return res.sendStatus(400);
			if (error) return res.status(500).send({ error: error });
        	Article.findOneAndUpdate({_id: articleId, 'comments.commentId': commentId}, {$set: {'comments.$.text': text}},
        							 {upsert: true, new: true}, (error, docArticle) => {
            	if (error) return res.status(500).send({ error: error });
	        	articles.articles.push(docArticle);
                return res.status(200).send(articles);
           	 });
    	});
	}else{								// add new comment
		const newCommentId = date.getTime() + Math.floor((Math.random() * 300000023) + 1);
        const newComment = new Comment({commentId: newCommentId, author: username, date: date, text: text});
        Comment.create(newComment, (error, doc) => {
        	if (!doc) return res.sendStatus(400);
            if (error) return res.status(500).send({ error: error });
        });
        Article.findByIdAndUpdate(articleId, { $addToSet: {comments: newComment}}, {upsert: true, new: true}, (error, doc) =>{
        	if (!doc) return res.sendStatus(400);
	        articles.articles.push(doc);
            return res.status(200).send(articles);
        });
	}
}

const postArticle = (req, res) => {
	const username = req.body.username ? req.body.username : req.username;
	const text = req.body.text || "";
	const date = new Date();
	const newArticleId = date.getTime() + Math.floor((Math.random() * 100000023) + 1);
	const newArticle = {id: newArticleId, text: text, author: username, img: null, date: date, comments:[]};
	Article.create(newArticle, (error, doc) => {
		if (!doc) return res.sendStatus(400);
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({articles: [doc]});
    }); 
}

const deleteArticle = (req, res) => {
	const username = req.body.username ? req.body.username : req.username;
	Article.remove({author: username}, (error, docs) => {
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send(docs);
    });
}

module.exports = (app) => {
	app.get('/articles/:id*?', getArticle);
    app.put('/articles/:id', putArticle);
    app.post('/article', postArticle);
    app.delete('/articles', deleteArticle);
}