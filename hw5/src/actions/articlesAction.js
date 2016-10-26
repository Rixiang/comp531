import { resource } from './serverAction'

export const getArticles = (dispatch) => {
    return resource('GET', 'articles').then((r) => {
        dispatch({ type: 'getArticles', articles: r.articles});
    })
}
