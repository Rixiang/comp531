export const showComments = dispatch => {
	if (document.getElementById("showComments").value == "Show comments"){
		return dispatch({ type: "showComments" });
	}else{
		return dispatch({ type: "hideComments" });
	}
}

export const addComment = dispatch => {
	if (document.getElementById("addComment").value == "Add a comment"){
		return dispatch({ type: "addComment" });
	}else{
		return dispatch({ type: "cancelAdd" });
	}
}