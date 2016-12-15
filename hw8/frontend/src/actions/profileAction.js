import { resource } from './serverAction'

export const getEmail = (dispatch) => {
    const username = document.querySelector("#inputAccount").value;
    return resource('GET', `email/${username}`)
	    .then((r) => {
	        dispatch({ type: 'getEmail', email: r.email});
	    })
}

export const getDob = (dispatch) => {
    const username = document.querySelector("#inputAccount").value;
    return resource('GET', `dob`)
	    .then((r) => {
	    	var date = new Date(r.dob);
	        dispatch({ type: 'getDob', dob: date.toLocaleDateString() });
	    })
}

export const getZipcode = (dispatch) => {
    const username = document.querySelector("#inputAccount").value;
    return resource('GET', `zipcode/${username}`)
	    .then((r) => {
	        dispatch({ type: 'getZipcode', zipcode: r.zipcode });
	    })
}


