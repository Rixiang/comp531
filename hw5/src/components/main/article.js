import React from 'react'
import { connect } from 'react-redux'

import { showComments, addComment } from '../../actions/commentAction'
import Comment from './comment'

const Article = ({ _id, author, date, text, img, comments, btnShowValue, btnAddValue, showComments, addCommnet }) => (
	<div className="row">
		<div className="col-sm-3">
          	<div className="well">
              	<p><span>{date}, {author}:</span></p>
          	</div>
      	</div>

	  	<div className="col-sm-9">
	      	<div className="well">
	        	<p><img src={img} id="december18" className="ys"></img></p>
	        	<p>{text}</p>
	         	<input type="button" className="btn btn-primary btn-sm " id="showComments" value={btnShowValue} onClick={ showComments }></input>
	   			<input type="button" className="btn btn-primary btn-sm " id="addComment" value={btnAddValue} onClick={ addCommnet }></input>
	     	</div>
	     	{ 
				comments.map( comment => <Comment commentId={comment.commentId} author={comment.author}
	          		date={comment.date} text={comment.text}/> ) 
			} 
	 	</div>
	</div>
);



const mapStateToProps = (state, ownProps )=> ({ 
		_id: ownProps._id, author: ownProps.author, date: ownProps.date, text: ownProps.text, img: ownProps.img, 
		comments: ownProps.comments, btnShowValue: state.comment.btnShowValue, btnAddValue: state.comment.btnAddValue
	});

const mapDispatchToProps = dispatch => ({ showComments: () => (showComments(dispatch)), 
										  addCommnet: () => (addComment(dispatch)) });

export default connect(mapStateToProps, mapDispatchToProps)(Article);