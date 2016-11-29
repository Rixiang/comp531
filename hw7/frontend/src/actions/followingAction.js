import { resource } from './serverAction'
import { getHeadlines } from './headlineAction'
import { getArticles } from './articlesAction'

export const getFollowing = dispatch => {
    return resource('GET', 'following')
	    .then(r => {
	    	let followers = [...r.following, r.username];
	    	let followerAvatars = {};
	    	resource('GET', `headlines/${[...followers].join(',')}`)
	    	.then(res => {
	    		resource('GET', `avatars/${[...followers].join(',')}`)
		        .then(response => {
		            response.avatars.forEach((s) => {
		                followerAvatars[s.username] = s.avatar;
		            })
		        })
		        .then(
	    		_ => dispatch({ type: 'getFollowing', headlines: res.headlines, username: r.username, 
	    			following: r.following, followerAvatars: followerAvatars })
	    		);
	    	});
	    });
}

export const addFollower = dispatch => {
	const user = document.getElementById("txfAddFriend").value;
	resource('GET', 'following')
	.then(r => {
		let followers = [...r.following, r.username];
		let addSame = (followers.filter(follower => (follower == user) ).length > 0) ? true : false;
		if (addSame){
			document.getElementById("txfAddFriend").value = "";
			return dispatch({ type:"addSameFollower", error: true });
		}else{
			document.getElementById("txfAddFriend").value = "";
			followers = [];
			var followerAvatars = {};
		    return resource('PUT', `following/${user}`)
			    .then(r => {
			    	followers = [...r.following, r.username];
			    	resource('GET', `headlines/${[...followers].join(',')}`)
			    	.then(res => {
			    		resource('GET', `avatars/${[...followers].join(',')}`)
				        .then(response => {
				            response.avatars.forEach((s) => {
				                followerAvatars[s.username] = s.avatar;
				            })
				        })
				        .then(_ => dispatch({ type:"addFollower", headlines: res.headlines, username: r.username, following: r.following, 
			    			followerAvatars: followerAvatars, error: false }))
				        .then(r => getArticles(dispatch)
				        	.then(_ => getFollowing(dispatch))
				        );
			    	})
			    })
			    .catch(e => dispatch({ type:"errorAddFollower", error: true }));
		}
	});
}

export const deleteFollower = (dispatch, user) => {
    return resource('DELETE', `following/${user}`)
	    .then(r => {
			let followers = [...r.following, r.username];
			var followerAvatars = {};
	    	resource('GET', `headlines/${[...followers].join(',')}`)
	    	.then(response => {
	    		resource('GET', `avatars/${[...followers].join(',')}`)
		        .then(response => {
		            response.avatars.forEach((s) => {
		                followerAvatars[s.username] = s.avatar;
		            })
		        })
		        .then(_ => dispatch({ type: 'deleteFollower', headlines: response.headlines, 
		        					  username: r.username, following: r.following, followerAvatars: followerAvatars }));
	    	})
	    	.then(r => getArticles(dispatch)
	    		.then(_ => getFollowing(dispatch))
	    	);
	    })
}