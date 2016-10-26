import React from 'react'
import { connect } from 'react-redux'

const Comment = ( {date, author, text, show, add} ) => {
	if (show && !add) {
		return (
			<div className="col-sm-12">
			  	<div className="well">
			      	<p><span>On {date}, {author}} commented:</span></p>
			      	<p>{text}</p>
				</div>
			</div>
		);
	}else if (!show && add) {
		return (
			<div className="form-group col-sm-12">
				<textarea className="form-control" id="txAddComm" rows="4" placeholder="add a comment..."></textarea><br/>
				<input type="button" className="btn btn-primary btn-sm " id="addComment" value="Make comment"></input>
			</div>
		);
	}else if (show && add){
		return (
			<div>
				<div className="col-sm-12">
				  	<div className="well">
				      	<p><span>On {date}, {author}} commented:</span></p>
				      	<p>{text}</p>
					</div>
				</div>
				<div className="col-sm-12">
				  	<div className="well">
				      	<p><span>On {date}, {author}} commented:</span></p>
				      	<p>{text}</p>
					</div>
				</div>
			</div>
		);
	}else {
		return (<div></div>);
	}
}

const mapStateToProps = (state, ownProps) => ({ 
					date: ownProps.date, author: ownProps.author, text: ownProps.text,
					show: state.comment.showCom, add: state.comment.addCom  });

export default connect(mapStateToProps, null)(Comment);