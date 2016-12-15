import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { logIn, logInFacebook } from '../../actions/serverAction'
import ErrLogIn from './errorLogIn'

const LogIn = ({ signIn, logInFaceBook }) => (
	<div>
		<h2 className="form-signin-heading col-sm-offset-2">Please Sign in!</h2>
	    <p><input type="text" id="inputAccount" className="form-control" placeholder="Account Number" required></input></p>
	    <p><input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input></p>
	    <div><ErrLogIn/></div>
	    <a className="btn btn-primary btn-block" type="submit" id="logIn" onClick={ signIn }>Sign in</a>
    	<button className="btn btn-block btn-social btn-facebook" onClick={ logInFacebook }>
    		<span className="fa fa-facebook" ></span> 
    		<span>Sign in with Facebook</span>
 		 </button>
    </div>
)

const mapDispatchToProps = dispatch => ({ signIn: () =>  logIn(dispatch),
										  logInFacebook: () => logInFacebook(dispatch)} );

export default connect(null, mapDispatchToProps)(LogIn);