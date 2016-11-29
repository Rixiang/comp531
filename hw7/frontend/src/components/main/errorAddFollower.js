import React  from 'react'
import { connect } from 'react-redux'

const ErrorAddFollower = ({ addSame, errorAdd }) => {
	if (addSame){
		return (
			<div className="alert alert-danger ">
			    <strong>Error!</strong>  Please add a new follower!
			</div>
		);
	}else if (errorAdd){
		return (
			<div className="alert alert-danger ">
			    <strong>Error!</strong> The user hasn't registered!
			</div>
		);
	}else{
		return (<div></div>);
	}
}

const mapStateToProps = state => ({ addSame: state.main.addSameFollower, 
									errorAdd: state.main.errorAddFollower });

export default connect(mapStateToProps, null)(ErrorAddFollower);