const express = require('express')
const bodyParser = require('body-parser')

var articles = {articles:[
		{ id:1, author: 'Scott', text:'A post'}, 
      	{ id:2, author: 'Xiang', text:'Another post' }, 
      	{ id:3, author: 'Michael', text:'Another post' }]}

const getArticle = (req, res) => {
	if(req.params.id){
    	res.send(articles.articles.filter(r => r.id == req.params.id));
    }else{
    	res.send(articles.articles);
    }
}


const addArticle = (req, res) => {
    console.log('Payload received', req.body) 
    let id = articles.articles.length + 1;
    articles.articles.push({id:id, author: 'Xiang', text: req.body.body});  
    res.send({id:id, author: 'Xiang', text: req.body.body});
}

const app = express();
app.use(bodyParser.json());

app.get('/articles/:id*?', getArticle);
app.post('/article', addArticle);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})