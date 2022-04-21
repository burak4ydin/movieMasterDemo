import { GET_MOVIES,GET_CATS,GET_LIKES,UPDATE_LIKE } from '../actions/index';
const initialState = {

    movies:[],
    categories:[],
    likes:[]
};
const movieReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_MOVIES:
            return {
                ...state,
                movies:action.payload,
            };
        case GET_CATS:
            return {
                ...state,
                categories:action.payload
            };
        case GET_LIKES:
            return {
                ...state,
                likes:action.payload
            };
        case UPDATE_LIKE:
            return {
                ...state,
                likes:action.payload
            };

        default:
            return state;
    }
}
export default movieReducer;
