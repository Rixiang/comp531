import React from 'react'
import { connect } from 'react-redux'

const ErrUpdate = ({ hasError }) => {
	if (hasError){
		return (
			<div className="alert alert-danger ">
			    <strong>Error!</strong>  Error happens when updating information!
			</div>
		);
	}else{
		return ( <div></div> );
	}
}

const mapStateToProps = state => ({ hasError: state.profile.hasError });

export default connect(mapStateToProps, null)(ErrUpdate);