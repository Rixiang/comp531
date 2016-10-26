import React from 'react'
import { connect } from 'react-redux'

import Article from './article'
import { getArticles } from '../../actions/articlesAction'

const Articles = ({ getArticles, articles }) => (
	<div>
		{ 
			articles.sort((a,b) => {
		        if (a.date < b.date)
		          return 1
		        if (a.date > b.date)
		          return -1
		        return 0
		      })
			.map( article => <Article _id={article._id} author={article.author}
          		date={article.date} text={article.text} img={article.img} 
          		comments={article.comments}/> ) 
		}     
	</div>
);


const mapStateToProps = state => ({ articles: state.article.articles });
const mapDispatchToProps = dispatch => ({ getArticles: () => (getArticles(dispatch)) });

export default connect(mapStateToProps, mapDispatchToProps)(Articles);