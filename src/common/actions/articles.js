import request from 'axios';

export const ARTICLES_GET = 'ARTICLES_GET';
export const ARTICLES_GET_REQUEST = 'ARTICLES_GET_REQUEST';
export const ARTICLES_GET_SUCCESS = 'ARTICLES_GET_SUCCESS';
export const ARTICLES_GET_FAILURE = 'ARTICLES_GET_FAILURE';

export const ADD_ARTICLE = 'ADD_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';

export function articlesGet() {
    console.log("NEW REQUEST::::" + Date.now());
    return {
        type: ARTICLES_GET,
        promise: request.get('https://chicagowepapp.firebaseio.com/articles.json?time=' + Date.now()),
        isFireBaseRequest: true
    };
}

export function addArticle(article) {
    return {
        type: ADD_ARTICLE,
        payload: article
    };
}
export function removeArticle(index) {
    return {
        type: REMOVE_ARTICLE,
        payload: index
    };
}