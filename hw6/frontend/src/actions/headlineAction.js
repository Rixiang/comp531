import { resource } from './serverAction'

export const updateHeadline = dispatch => {
    const payload = { headline: document.getElementById("txfUploadStatus").value };
    document.getElementById("txfUploadStatus").value = null;
    return resource('PUT', 'headline', payload).then((r) => {
        dispatch({ type: 'updateHeadline', headline: r.headline});
    });
}

export const getHeadlines = (dispatch, followers) => {

	return resource('GET', `headlines/${[...followers].join(',')}`)
       	    .then( r => {
		        dispatch({ type: 'getHeadlines', headlines: r.headlines });
		    });
		
}
