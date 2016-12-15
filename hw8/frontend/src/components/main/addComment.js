import React from 'react'
import { connect } from 'react-redux'

import { postComment } from '../../actions/commentAction'

const AddComment = ( { add , id, post } ) => {
	let commentId = "" + id + "comment";
	if (add[id]) {
		return (
			<div className="form-group col-sm-12">
				<textarea className="form-control" id={commentId} rows="4" placeholder="add a comment..."></textarea><br/>
				<input type="button" className="btn btn-primary btn-sm " id="addComment" value="Make comment" onClick={post}></input>
			</div>
		);
	}else {
		return (<div></div>);
	}
}

const mapStateToProps = (state, ownProps) => ({ add: state.comment.addCom, id: ownProps.id });

const mapDispatchToProps = (dispatch, ownProps) => ({ post: () => postComment(dispatch, ownProps.id)});


export default connect(mapStateToProps, mapDispatchToProps)(AddComment);