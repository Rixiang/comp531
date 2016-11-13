import React  from 'react'
import { connect } from 'react-redux'

const ErrLogIn = ({ hasError }) => {
	if (hasError){
		return (
			<div className="alert alert-danger ">
			    <strong><span id="logInInfo">Error!</span></strong>  Error happens when log in!
			</div>
		);
	}else{
		return (
			<div>
			    <strong><span id="logInInfo"></span></strong> 
			</div>);
	}
}

const mapStateToProps = state => ({ hasError: state.logIn.hasErrorLogIn });

export default connect(mapStateToProps, null)(ErrLogIn);