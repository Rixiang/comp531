import { combineReducers } from 'redux'

const navigate = (state = { location: '' }, action) => {
    switch(action.type) {
		case 'main':
			return { location:'main' };
		case 'profile':
			return { location:'profile' };
		case 'landing':
			return { location:'landing' };
		default: 
			return state;
	}
}

const register = (state = { hasErrorSignOn: null, successSignOn: null, hasPwdErrorSignOn: null }, action) => {
    switch(action.type) {
		case 'normalRegister':
	    	return {hasErrorSignOn: false, successSignOn: true, hasPwdErrorSignOn: false};
	    case 'errorRegister':
	    	return {hasErrorSignOn: true, successSignOn: false, hasPwdErrorSignOn: false};
	    case 'errorPwdRegister':
	    	return {hasErrorSignOn: false, successSignOn: false, hasPwdErrorSignOn: true};
	    default:
	    	return state;
	}
}

const logIn = (state = { hasErrorLogIn: null }, action) => {
    switch(action.type) {
    	case 'normalLogin':
    		return { hasErrorLogIn: false };
	    case 'errorLogin':
			return { hasErrorLogIn: true };
	    default:
	    	return state;
	}
}

const main = (state = { headline: 'Busy on Comp531!' }, action) => {
    switch(action.type) {
		case 'updateHeadline':
			return { headline: action.headline };
	    default:
	    	return state;
	}
}

const profile = (state = { headline: '', username:'', email: '', phonenNum: '', zipCode: '', pwd: '', hasError: null }, action) => {
    switch(action.type) {
    	case 'normalUpdate':
    		return { ...state, hasError: false };
	    case 'errorUpdate':
			return { ...state, hasError: true };
	    default:
	    	return state;
	}
}

const Reducer = combineReducers({ navigate, register, logIn, main, profile });

export default Reducer;