import React from 'react'
import { connect } from 'react-redux'

import ErrUpdate from './errorUpdate'
import { updateProfile } from '../../actions/updateAction'

const Update = ({ update }) => {
	 return (
	 	<div>
	        <form name="accountRegisteration" className="form-horizontal col-sm-6" id="signOnForm" action="">
	        	<h2 className="form-signup-heading col-sm-offset-3">Update your info</h2>
	        	<br/> 
	            <div className="form-group">
	                <label className="control-label col-sm-4">Display name:</label>
	                <div className="col-sm-6">
	                    <input type="text" id="displayNameValue"  className="form-control" placeholder="(Optional) please enter a name to display"></input>
	                </div>
	            </div>
	            <div className="form-group">
	                <label className="control-label col-sm-4">Email address:</label>
	                <div className="col-sm-6">
	                    <input type="email" id="emailAddr" className="form-control" placeholder="Please enter an email address"></input>
	                </div>
	            </div>
	            <div className="form-group">
	                <label className="control-label col-sm-4">Phone Number:</label>
	                <div className="col-sm-6">
	                    <input type="text" id="phoneNumber" className="form-control" pattern='^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$' 
	                    	placeholder="e.g. 713-348-6000" title="Numbers[0-9] and - only, e.g. 713-348-6000"></input>
	                </div>
	            </div>
	            <div className="form-group">
	                <label className="control-label col-sm-4">Zip code:</label>
	                <div className="col-sm-6">
	                    <input type="text" id="zipCodeValue" className="form-control" pattern='^[0-9][0-9][0-9][0-9][0-9]$' 
	                    placeholder="e.g. 77005" title="Numbers[0-9] only e.g. 77005"></input>
	                </div>
	            </div>
	            <div className="form-group">
	                <label className="control-label col-sm-4">Password:</label>
	                <div className="col-sm-6">
	                    <input type="password" id="pwdValue" className="form-control" placeholder="Please set an password "></input>
	                </div>
	            </div>
	            <div className="form-group">
	                <label className="control-label col-sm-4">Confirm Password:</label>
	                <div className="col-sm-6">
	                    <input type="password" id="pwdConfValue"  className="form-control" placeholder="Please re-enter the password "></input>
	                </div>
	            </div>
	            <div className="col-sm-8 col-sm-offset-2">
	            	<div><ErrUpdate/></div>
	                <button className="btn btn-primary btn-block "  id="submit" onClick={ update }>Update</button>
	            </div>
	            <div className="col-sm-2">
	            </div>
	        </form> 
	    </div>
	 );
}

const mapDispatchToProps = dispatch => ({ update: () => ( updateProfile(dispatch)) });

export default connect(null, mapDispatchToProps)(Update);