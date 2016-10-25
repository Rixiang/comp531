import React from 'react'
import { connect } from 'react-redux'

const NavMain = ({ nevToProfile, nevToLanding }) => (
	<div>
		<nav className="navbar navbar-inverse">
	        <div className="container-fluid">
	            <div className="navbar-header">
	                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                </button>
	                <a className="navbar-brand">Ricebook</a>
	            </div>

	            <div className="collapse navbar-collapse" id="myNavbar">
	                <ul className="nav navbar-nav">
	                    <li className="active"><a>Home</a></li>
	                    <li><a  onClick={ nevToProfile }>Profile</a></li>
	                </ul>
	                <form className="navbar-form navbar-right" role="search">
	                    <div className="form-group input-group">
	                        <input type="text" className="form-control" placeholder="Search.."></input>
	                        <span className="input-group-btn">
	                            <button className="btn btn-default" type="button">
	                            <span className="glyphicon glyphicon-search"></span>
	                            </button>
	                        </span>
	                    </div>
	                </form>
	                <ul className="nav navbar-nav navbar-right">
	                    <li><a id="logOut" onClick={ nevToLanding }><span className="glyphicon glyphicon-user"></span> Log out</a></li>
	                </ul>
	            </div>
	        </div>
	    </nav>
	</div>
)

const mapDispatchToProps = dispatch => ({ nevToProfile: () => dispatch({type: 'profile'}), 
										  nevToLanding: () => dispatch({type: 'landing'}) });

export default connect(null, mapDispatchToProps)(NavMain);