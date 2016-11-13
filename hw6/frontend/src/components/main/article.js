import React from 'react'
import { connect } from 'react-redux'

import { showComments, addComment } from '../../actions/commentAction'
import { editPost } from '../../actions/articlesAction'
import Comment from './comment'
import AddComment from './addComment'

import ContentEditable from './react-contenteditable'


let newText = "";

const Article = ({ _id, author, date, avatar, text, img, comments, loggedInUser, avatars, 
	               btnShowValue, btnAddValue, showComments, addCommnet, editPost }) => {
	
	const newDate = date.substring(0, 10);
	const newSecond = date.substring(11, 19);
	let addValue = btnAddValue[_id];
	let addVauleId = "" + _id + "addBtn";
	let showValue = btnShowValue[_id];
	let showVauleId = "" + _id + "showBtn";
	let editPostId = "" + _id + "postBtn";
	let textId = "" + _id + "text";

	let commentList = [];
	if (comments != null){
		commentList = comments.map( comment => {
			let avatar = avatars[comment.author];
			return <Comment commentId={comment.commentId} author={comment.author} avatar={avatar}
      		date={comment.date} text={comment.text} articleId={ _id }/> 
  		});
  	}

  	let authorInfo = (<div className="col-sm-3">
				          	<div className="well">
				              	<p><span>{newDate}<br/> at {newSecond}, <br/></span></p>
				              	<p><img src={avatar} className="img-rounded" style={ {width: "75%"} }></img></p>
				              	<span><b><h4>{author}</h4></b></span>

				          	</div>
				      	</div>)

  	if (loggedInUser == author){

  		return (
			<div className="row">
				{ authorInfo }

			  	<div className="col-sm-9">
			      	<div className="well">
			        	<p><img src={img} className="ys"></img></p>
			        	<ContentEditable html={text} disabled={false} onChange={e => {newText = e.target.value}} style={ {"textAlign": "justify"} } id={textId}/>
			         	<input type="button" className="btn btn-primary btn-sm " id={showVauleId} value = {showValue} onClick={ showComments }></input>
			   			<input type="button" className="btn btn-primary btn-sm " id={addVauleId} value={addValue} onClick={ addCommnet }></input>
			   			<input type="button" className="btn btn-primary btn-sm " id={editPostId} value="Edit Post" onClick={ editPost }></input>
			     	</div>
			     	<div>
			     		<AddComment id={ _id }/>
			     	</div>
			     	{ commentList }
			 	</div>
			</div>
		);
  	}
  	else{
		return (
			<div className="row">
				{ authorInfo }

			  	<div className="col-sm-9">
			      	<div className="well">
			        	<p><img src={img} className="ys"></img></p>
			        	<p style={ {"textAlign": "justify"} }>{text}</p>
			         	<input type="button" className="btn btn-primary btn-sm " id={showVauleId} value = {showValue} onClick={ showComments }></input>
			   			<input type="button" className="btn btn-primary btn-sm " id={addVauleId} value={addValue} onClick={ addCommnet }></input>
			     	</div>
			     	<div>
			     		<AddComment id={ _id }/>
			     	</div>
			     	{ commentList }
			 	</div>
			</div>
		);
	}
}



const mapStateToProps = (state, ownProps)=> ({ 
		_id: ownProps._id, author: ownProps.author, date: ownProps.date, avatar: ownProps.avatar, text: ownProps.text, 
		img: ownProps.img, comments: ownProps.comments, loggedInUser: state.logIn.username, 
		avatars: state.article.avatars, btnShowValue: state.comment.btnShowValue, btnAddValue: state.comment.btnAddValue
	});

const mapDispatchToProps = (dispatch, ownProps) => ({ showComments: () => showComments(dispatch, ownProps._id), 
										  			  addCommnet: () => addComment(dispatch, ownProps._id),
										  			  editPost: () => editPost(dispatch, ownProps._id, newText) });

export default connect(mapStateToProps, mapDispatchToProps)(Article);