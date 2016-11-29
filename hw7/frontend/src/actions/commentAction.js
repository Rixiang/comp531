import { resource } from './serverAction'
import { getArticles } from './articlesAction'

export const showComments = (dispatch, id) => {
	if (document.getElementById("" + id + "showBtn").value == "Show comments"){
		return dispatch({ type: "showComments", id: id });
	}else{
		return dispatch({ type: "hideComments", id: id });
	}
}

export const addComment = (dispatch, id) => {
	if (document.getElementById("" + id + "addBtn").value == "Add a comment"){
		return dispatch({ type: "addComment", id: id });
	}else{
		return dispatch({ type: "cancelAdd", id: id });
	}
}

export const postComment = (dispatch, articleId) => {
	const comment = document.getElementById("" + articleId + "comment").value;
	const payload = { text: comment, commentId: -1 };
    return resource('PUT', `articles/${articleId}`, payload)
            .then(r => getArticles(dispatch));
}

export const updateComment = (dispatch, articleId, commentId, newComment) => {
	const payload = { text: newComment, commentId: commentId };
    return resource('PUT', `articles/${articleId}`, payload)
            .then(r => getArticles(dispatch));
}

export const enableEditComment = (dispatch, newComment, text) => {
	if (newComment !=  "" && newComment != text){
		return dispatch({ type: "enableEditComment", disabled: false});
	}else{
		return dispatch({ type: "disableEditComment", disabled: true});
	}
}