import React from 'react'
import { connect } from 'react-redux'

const InfoSignOn = ({ hasError, success, hasPwdError, connectionError }) => {
	if (success){
		return (
			<div className="alert alert-success fade in">
			    <strong><span id="signOnInfo">Success!</span></strong> Now you can login in!
			</div>
		);
	}else if (hasError){
		return (
			<div className="alert alert-danger fade in">
			    <strong><span id="signOnInfo">Error!</span></strong> All information is required!
			</div>
		);
	}else if (hasPwdError){
		return (
			<div className="alert alert-danger fade in">
			    <strong><span id="signOnInfo">Error!</span></strong> Two passwords are different!
			</div>
		);
	}else if (connectionError){
		return (
			<div className="alert alert-danger fade in">
			    <strong><span id="signOnInfo">Error!</span></strong> Server connection went wrong!
			</div>
		);
	}else{
		return (
			<div>
			    <span id="signOnInfo"></span>
			</div>);
	}
}

const mapStateToProps = state => ({ hasError: state.register.hasErrorSignOn, connectionError: state.register.connectionError, 
		success: state.register.successSignOn, hasPwdError: state.register.hasPwdErrorSignOn });

export default connect(mapStateToProps, null)(InfoSignOn);

