import React from 'react'
import { connect } from 'react-redux'

import InfoSignOn from './infoSignOn'
import { signOnFunc } from '../../actions/registerAction'

const Register = ({ signOn }) => (
	<form name="accountRegisteration" className="form-horizontal" id="signOnForm" onSubmit={ signOn }>
		<h2 className="form-signup-heading col-sm-offset-3">Please sign up!</h2>
		<div className="form-group">
		    <label className="control-label col-sm-4">Account name:</label>
		    <div className="col-sm-6">
		        <input type="text" name="accountName" className="form-control"  id="registerAccount" pattern='^[A-Za-z][A-Za-z0-9]*$'  
		        placeholder="Letters and numbers, but may not start with a number" 
		        	title="Letters and numbers only, and may not start with a number" required>
		        </input>
		    </div>
		</div>
		<div className="form-group">
		    <label className="control-label col-sm-4">Display name:</label>
		    <div className="col-sm-6">
		        <input type="text" name="displayName" className="form-control" id="registerDisplayName"
		        	placeholder="(Optional) please enter a name to display">
		        </input>
		    </div>
		</div>
		<div className="form-group">
		    <label className="control-label col-sm-4">Email address:</label>
		    <div className="col-sm-6">
		        <input type="email" name="emailAddr" className="form-control" id="registerEmail"
		        	placeholder="Please enter an email address" required>
		        </input>
		    </div>
		</div>
		<div className="form-group">
		    <label className="control-label col-sm-4">Phone Number:</label>
		    <div className="col-sm-6">
		        <input type="text" name="phoneNumber" className="form-control" id="registerPhone"
		        	pattern='^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$' 
		       		placeholder="e.g. 713-348-6000" title="Numbers[0-9] and - only, e.g. 713-348-6000" required>
		       	</input>
		    </div>
		</div>
		<div className="form-group">
		    <label className="control-label col-sm-4">Date of Birth:</label>
		    <div className="col-sm-6">
		        <input type="date" name="dateOfBirth" className="form-control" id="registerDob"  
		        	placeholder="Only 18 years or older can register" required>
		        </input>
		    </div>
		</div>
		<div className="form-group">
		    <label className="control-label col-sm-4">Zip code:</label>
		    <div className="col-sm-6">
		        <input type="text" name="zipCode" className="form-control" id="registerZip"
		        	pattern='^[0-9][0-9][0-9][0-9][0-9]$' 
		        	placeholder="e.g. 77005" title="Numbers[0-9] only e.g. 77005" required>
		        </input>
		    </div>
		</div>
		<div className="form-group">
		    <label className="control-label col-sm-4">Password:</label>
		    <div className="col-sm-6">
		        <input type="password" name="password" className="form-control" id="registerPwd"
		        placeholder="Please set an password " required>
		       	</input>
		    </div>
		</div>
		<div className="form-group">
		    <label className="control-label col-sm-4">Confirm Password:</label>
		    <div className="col-sm-6">
		        <input type="password" name="passwordConf" className="form-control" id="registerPwdConfirm"
		        placeholder="Please re-enter the password " required></input>
		    </div>
		</div>
		<div><InfoSignOn/></div>
		<button type="submit" className="btn btn-primary col-sm-offset-4" value="Register" id="signOn">Register</button>
		<input type="reset" className="btn btn-primary col-sm-offset-1" value = "Clear"></input>
		<p><input type="hidden" name="Timestamp" id="timestamp"></input></p> 
		<div className="col-sm-2"></div>
	</form>
);

const mapDispatchToProps = dispatch => ({ signOn: (event) => (signOnFunc(dispatch, event))});

export default connect(null, mapDispatchToProps)(Register);
