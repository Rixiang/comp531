import React from 'react'
import { connect } from 'react-redux'

const ErrUpdate = ({ hasError }) => {
	if (hasError){
		return (
			<div className="alert alert-danger ">
			    <strong><span id="updateInfo">Error!</span></strong>  Error happens when updating information!
			</div>
		);
	}else{
		return ( 
			<div>
			    <span id="updateInfo"></span>
			</div>
		);
	}
}

const mapStateToProps = state => ({ hasError: state.profile.hasError });

export default connect(mapStateToProps, null)(ErrUpdate);