import { getArticles } from './articlesAction'
import { getEmail, getDob, getZipcode } from './profileAction'
import { getFollowing } from './followingAction'

export const url = 'https://young-scrubland-65070.herokuapp.com'

export const resource = (method, endpoint, payload, submitJson = true) => {
    const options = {credentials: 'include', method};
    if (submitJson) options.headers = {'Content-Type': 'application/json'};
    if (payload) {
        options.body = submitJson ? JSON.stringify(payload) : payload;
    }

    return fetch(`${url}/${endpoint}`, options)
    .then((response) => {
        if (response.status == 401) {
            const message = `Error in ${method} ${endpoint} ${JSON.stringify(response.json())}`;
            throw new Error(message);
        } else {
            return response.json();
        }
    })
} 

export const logIn = dispatch => {
    const username = document.querySelector("#inputAccount").value;
    const password = document.querySelector("#inputPassword").value;
    if (validateLogIn() == false) {
        return dispatch({type: 'errorLogin'});
    }else{
        return resource('POST', 'login', { username, password })
                .then(r => getFollowing(dispatch))
                .then(r => getArticles(dispatch))
                .then(r => getEmail(dispatch))
                .then(r => getDob(dispatch))
                .then(r => getZipcode(dispatch))
                .then(r => dispatch({type: 'normalLogin', username: username}))
                .then(r => dispatch({type: 'main'}))
                .catch(error => dispatch({type: 'errorLogin'}));
    }
}

const validateLogIn = () => {
    var inputAccount = document.getElementById("inputAccount").value;
    var inputPassword = document.getElementById("inputPassword").value;

    if (inputAccount == null || inputAccount == "") {
        return false;
    }if (inputPassword == null || inputPassword == "") {
        return false;
    }else{
        return true;
    }
}

export const LogOut = (dispatch) => {
  return resource('PUT', 'logout')
    .catch(dispatch({type: 'landing'}));
}


