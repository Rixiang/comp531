import React from 'react'
import { connect } from 'react-redux'

import Article from './article'


const Articles = ({ articles, avatars, followerAvatars, keyword }) => {
	if (articles != null){
		return(
			<div>
				{ 
					articles.filter( article => {
						if (keyword != ''){
							 return article.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 || article.author === keyword;
						}else{
							return article;
						}
				    
				    })
					.sort((a,b) => {
				        if (a.date < b.date)
				          return 1
				        if (a.date > b.date)
				          return -1
				        return 0
				    })
					.map( article => {
						let avatar = avatars[article.author];
						return <Article _id={article._id} author={article.author} date={article.date} avatar={avatar} 
						text={article.text} img={article.img} comments={article.comments} /> ;
					}) 
				}     
			</div>
		);
	}else{
		return (
			<div></div>
		);
	} 
}

const mapStateToProps = state => ({ articles: state.article.articles, avatars: state.article.avatars, 
									followerAvatars: state.main.followerAvatars, keyword: state.navigate.keyword });

export default connect(mapStateToProps, null)(Articles);