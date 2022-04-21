import { GET_CATS,GET_MOVIES,GET_LIKES,UPDATE_LIKE } from './index';
export function getMovies(data) {
    return {
        type: GET_MOVIES,
        payload: data
    }
}
export function getCats(data) {
    return {
        type: GET_CATS,
        payload: data
    }
}

export function getLikes(data) {
    return {
        type: GET_LIKES,
        payload: data
    }
}

export function updateLikes(data) {
    return {
        type: UPDATE_LIKE,
        payload: data
    }
}

