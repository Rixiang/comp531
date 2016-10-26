import React from 'react'
import { connect } from 'react-redux'

const Comments = ({ show, add }) => {

	if (show && !add) {
		return (
			<div>
				<div className="col-sm-12">
			      	<div className="well">
			          	<p><span>On December 18, Pipi commented:</span></p>
			          	<p>
		                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
		                    dolor magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
		                    ex ea commodo consequat.
		  			    </p>
		  			</div>
			  	</div>
			  	<div className="col-sm-12">
			      	<div className="well">
			          	<p><span>On December 12, Evita commented:</span></p>
			          	<p>
							Aenean eget tortor et ipsum convallis convallis non sit amet massa. Donec nec vestibulum sem. 
					        Sed et est molestie, congue magna vitae, aliquet lacus. Ut in scelerisque ante.	  			    
					    </p>
		  			</div>
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
			<div className="row">
				<div className="form-group col-sm-12">
					<textarea className="form-control" id="txAddComm" rows="4" placeholder="add a comment..."></textarea><br/>
					<input type="button" className="btn btn-primary btn-sm " id="addComment" value="Make comment"></input>
			      	<div className="well">
			          	<p><span>On December 18, Pipi commented:</span></p>
			          	<p>
		                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
		                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
		  			    </p>
		  			</div>
			  	</div>
			</div>
		);
	}else{
		return (<div></div>);
	}
}

const mapStateToProps = (state) => ({ show: state.comment.showCom,
									add: state.comment.addCom });

export default connect(mapStateToProps, null)(Comments);