import React from 'react'
import { connect } from 'react-redux'

import { updateComment, enableEditComment } from '../../actions/commentAction'

import ContentEditable from './react-contenteditable'

let newComment = "";

const Comment = ( { loggedInUser, avatar, date, author, text, articleId, show, disabled, update, enableEditComment} ) => {
	const newDate = date.substring(0, 10);
	const newSecond = date.substring(11, 19);

	let editCommentBtn = (<div></div>);
	let comment = (<p style={ {"textAlign": "justify", "fontSize":"13"} }>{text}</p>);
	if (loggedInUser == author){
		comment = <ContentEditable html={text} disabled={false} onChange={e => {newComment = e.target.value; enableEditComment;}} 
			      	 style={ {"textAlign": "justify", "fontSize":"13"} } />;

		editCommentBtn = (<div className="col-sm-4 col-sm-offset-4">
						  	  <button className="btn btn-primary btn-block" id="editCommentBtn" onClick={update} disabled={false}>
						  	  	  <span style={{"fontSize":"13"}}>Update</span>
						  	  </button>
						  </div>);	
	}
	if (show[articleId]) {
		return (
			<div className="col-sm-12">
			  	<div className="well">
			      	<p style={ {"textAlign": "left", "fontSize":"12"} } >
				      	<img src={avatar} className="img-responsive img-rounded" className="ys" style={ {width: "8%"} }></img>
			      		<span >  <b>{author}</b> commented at {newSecond} on {newDate} :</span>
			      	</p>
			      	{ comment }
			      	{ editCommentBtn }
				</div>
			</div>
		);
	}else {
		return (<div></div>);
	}
}

const mapStateToProps = (state, ownProps) => ({ 
					avatar: ownProps.avatar, date: ownProps.date, author: ownProps.author, text: ownProps.text, articleId: ownProps.articleId,
					show: state.comment.showCom, loggedInUser: state.logIn.username, disabled: state.comment.disabled });

const mapDispatchToProps = (dispatch, ownProps) => ({ update: () => updateComment(dispatch, ownProps.articleId, ownProps.commentId, newComment ),
													  enableEditComment: () => enableEditComment(dispatch, newComment, ownProps.text)});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);