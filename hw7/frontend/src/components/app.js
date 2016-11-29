import React from 'react'
import { connect } from 'react-redux'

import Main from './main/main'
import Landing from './auth/landing'
import Profile from './profile/profile'


var App = ({location}) => {
	if (location == 'main') {
		return (<Main/>);
	} else if (location == 'profile') {
		return (<Profile/>);
	} else {
		return (<Landing/>);
	}
}

const mapStateToProps = state => ({ location: state.navigate.location });

App = connect((state) => mapStateToProps, null)(App);

export default App;
