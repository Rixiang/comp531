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

const article = (state = { articles: {} }, action) => {
    switch(action.type) {
		case 'getArticles':
			return { articles: action.articles };
	    default:
	    	return state;
	}
}

const comment = (state = { showCom: false, addCom: false, btnShowValue: "Show comments", btnAddValue: "Add a comment" }, action) => {
	switch(action.type) {
		case 'showComments':
			return { ...state, showCom: true, btnShowValue: "Hide comments" };
		case 'addComment':
			return { ...state, addCom: true, btnAddValue: "Cancel" };
		case 'hideComments':
			return { ...state, showCom: false, btnShowValue: "Show comments" };
		case 'cancelAdd':
			return { ...state, addCom: false, btnAddValue: "Add a comment" };
	    default:
	    	return state;
	}
}

const profile = (state = { hasError: false }, action) => {
    switch(action.type) {
    	case 'normalUpdate':
    		return { hasError: false };
	    case 'errorUpdate':
			return { hasError: true };
	    default:
	    	return state;
	}
}

const Reducer = combineReducers({ navigate, register, logIn, main, article, comment, profile });

export default Reducer;