import React  from 'react'
import { connect } from 'react-redux'

const ErrLogIn = ({ hasError }) => {
	if (hasError){
		return (
			<div className="alert alert-danger ">
			    <strong>Error!</strong>  Error happens when log in!
			</div>
		);
	}else{
		return (<div></div>);
	}
}

const mapStateToProps = state => ({ hasError: state.logIn.hasErrorLogIn });

export default connect(mapStateToProps, null)(ErrLogIn);