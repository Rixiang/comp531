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

const register = (state = { hasErrorSignOn: null, successSignOn: null, hasPwdErrorSignOn: null, connectionError: false, 
	              username: '', result: '' }, action) => {
    switch(action.type) {
		case 'normalRegister':
	    	return {...state, hasErrorSignOn: false, successSignOn: true, hasPwdErrorSignOn: false};
	    case 'errorRegister':
	    	return {...state, hasErrorSignOn: true, successSignOn: false, hasPwdErrorSignOn: false};
	    case 'errorPwdRegister':
	    	return {...state, hasErrorSignOn: false, successSignOn: false, hasPwdErrorSignOn: true};
	    case 'errorConnectionRegister':
	    	return {...state, hasErrorSignOn: false, successSignOn: false, hasPwdErrorSignOn: false, connectionError: true};
	    case 'accountRegistered':
	    	return {...state, username: action.username, result: action.result};
	    default:
	    	return state;
	}
}

const logIn = (state = { hasErrorLogIn: null, username: ""}, action) => {
    switch(action.type) {
    	case 'normalLogin':
    		return { hasErrorLogIn: false, username: action.username};
	    case 'errorLogin':
			return { hasErrorLogIn: true };
	    default:
	    	return state;
	}
}

const main = (state = { headline: '', headlineUpdated: false, username: '', following: [], followerAvatars: {}, headlines: [], 
					    addSameFollower: false, errorAddFollower: false}, action) => {
	 switch(action.type) {
		case 'updateHeadline':
			return {...state, headline: action.headline, headlineUpdated: true };
		case 'getFollowing':
			return {...state, username: action.username, headlines: action.headlines, following: action.following, followerAvatars: action.followerAvatars};
		case 'getHeadlines':
			return {...state, headlines: action.headlines};
		case 'addFollower':
			return {...state, username: action.username, headlines: action.headlines, following: action.following, followerAvatars: action.followerAvatars, 
					addSameFollower: action.error, hasErrorAddFollower: action.error};
		case 'addSameFollower':
			return {...state, addSameFollower: action.error};
		case 'errorAddFollower':
			return {...state, errorAddFollower: action.error};
		case 'deleteFollower':
			return {...state, username: action.username, headlines: action.headlines, following: action.following, followerAvatars: action.followerAvatars};
	    default:
	    	return state;
	}
}

const article = (state = { articles: {}, avatars: {} }, action) => {
    switch(action.type) {
		case 'getArticles':
			return { articles: action.articles, avatars: action.avatars};
	    default:
	    	return state;
	}
}

const comment = (state = { showCom: {}, addCom: {}, btnShowValue: {}, btnAddValue: {}, disabled: true}, action) => {
	switch(action.type) {
		case 'getArticles':
			// initialize state.comment.addCom and state.comment.showCom
			let newAddCom = Object.assign({}, state.addCom);
			let newAddValue = Object.assign({}, state.btnAddValue);
			let newShowCom = Object.assign({}, state.showCom);
			let newShowValue = Object.assign({}, state.btnShowValue);
			action.articles.map(article => {
                newAddCom[article._id] = false;
                newAddValue[article._id] = "Add a comment";
                newShowCom[article._id] = false;
                newShowValue[article._id] = "Show comments";
            });
            return {...state, showCom: newShowCom, addCom: newAddCom, btnShowValue: newShowValue, btnAddValue: newAddValue};
		case 'showComments':
			newShowCom = Object.assign({}, state.showCom);
			newShowCom[action.id] = true;
			newShowValue = Object.assign({}, state.btnShowValue);
			newShowValue[action.id] = "Hide Comments";
			return { ...state, showCom: newShowCom, btnShowValue: newShowValue };
		case 'addComment':
			newAddCom = Object.assign({}, state.addCom);
			newAddCom[action.id] = true;
			newAddValue = Object.assign({}, state.btnAddValue);
			newAddValue[action.id] = "Cancel";
			return {...state, addCom: newAddCom, btnAddValue: newAddValue};
		case 'hideComments':
			newShowCom = Object.assign({}, state.showCom);
			newShowCom[action.id] = false;
			newShowValue = Object.assign({}, state.btnShowValue);
			newShowValue[action.id] = "Show comments";
			return { ...state, showCom: newShowCom, btnShowValue: newShowValue };
		case 'cancelAdd':
			newAddCom = Object.assign({}, state.addCom);
			newAddCom[action.id] = false;
			newAddValue = Object.assign({}, state.btnAddValue);
			newAddValue[action.id] =  "Add a comment";
			return {...state, addCom: newAddCom, btnAddValue: newAddValue};
		case 'enableEditComment':
			return {...state, disabled: action.disabled};
		case 'disableEditComment':
			return {...state, disabled: action.disabled};	
	    default:
	    	return state;
	}
}

const profile = (state = { hasError: false, avatar: "", email: "", dob: "", zipcode: "", passwordStatus:"", avatars:{}, 
						   updated: false, avatarUpdateBtnDis: true }, action) => {
    switch(action.type) {
    	case 'getArticles':
    		return { ...state, avatars: action.avatars};
    	case 'getEmail':
    		return { ...state, email: action.email};
    	case 'getDob':
    		return { ...state, dob: action.dob};
    	case 'getZipcode':
    		return { ...state, zipcode: action.zipcode};
    	case 'getPassword':
    		return { ...state, password: action.password};
    	case 'normalUpdate':
    		return { ...state, hasError: false };
	    case 'errorUpdate':
			return { ...state, hasError: true };
		case 'updateAvatar':
			let newAvatars = Object.assign({}, state.avatars);
			newAvatars[action.username] = action.avatar;
			return { ...state, avatar: action.avatar,  avatarUpdateBtnDis: true, updated: true, avatars: newAvatars };
		case 'enableUpdateBtn':
			return { ...state, avatarUpdateBtnDis: false };
		case 'updateEmail':
			return { ...state, email: action.email};
		case 'updateZipcode':
			return { ...state, zipcode: action.zipcode};
		case 'updatePassword':
			return { ...state, passwordStatus: action.status};
		case 'profile':
			return { ...state, hasError: false };
	    default:
	    	return state;
	}
}

const Reducer = combineReducers({ navigate, register, logIn, main, article, comment, profile });

export default Reducer;