import { resource } from './serverAction'

const getAvatars = (r, username) => {
	var avatars = {};

    // retreive authors from articles
    const articleAuthors = new Set(r.articles.reduce((o, article) => {
                o.push(article.author);
                return o
            }, []).filter((author) => !avatars[author])); 

    // retreive authors from comments
    const commentAuthors = new Set(r.articles.reduce((o, article) => {
                article.comments.map((c) => c.author).forEach((author) => o.push(author))
                return o
            }, []).filter((author) => !avatars[author]));

    const authors = new Set([...articleAuthors, ...commentAuthors]);

    authors.add(username);

	console.log(JSON.stringify(authors));
	resource('GET', `avatars/${[...authors].join(',')}`)
        .then((res) => {
            res.avatars.forEach((s) => {
                avatars[s.username] = s.avatar;
            })
        })
    return avatars;
}

export const getArticles = dispatch => {
    const inputAccount = document.querySelector("#inputAccount");
    const headlineUsername = document.getElementById("headlineUsername");
    const displayName = document.getElementById("displayName");
    let username = "";
    if (inputAccount != undefined){
        username = inputAccount.value;
    }else if (headlineUsername != undefined){
        username = headlineUsername.value;
    }else{
        username = displayName.innerHTML;
    }
    return resource('GET', 'articles')
	    .then((r) => {
	    	const avatars = getAvatars(r, username);
	        dispatch({ type: 'getArticles', articles: r.articles, avatars: avatars });
	    })
	    .catch();
}

export const postArticle = dispatch => {
    const username = document.getElementById("headlineUsername").value;
    const text = document.getElementById("postText").value;
    var image = document.getElementById("postPhoto");
    if (image.files.length > 1){
        alert("You can only post up to one image.");
        return;
    }else{
        const fd = new FormData();
        fd.append('text', text);
        if (image.files.length >= 1){
            fd.append('image', image.files[0]);
        }
        return resource('POST', 'article', fd, false)
                .then(r => getArticles(dispatch));
    }
}

export const editPost = (dispatch, _id, newMessage) => {
    const payload = { text: newMessage };
    return resource('PUT', `articles/${_id}`, payload)
            .then(r => getArticles(dispatch));
}
