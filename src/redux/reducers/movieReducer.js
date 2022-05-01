import { GET_MOVIES,GET_CATS,GET_LIKES,UPDATE_LIKE } from '../actions/index';
const initialState = {

    movies:[],
    categories:[],
    likes:[],
    loading:true
};
const movieReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_MOVIES:

            return {
                ...state,
                movies:action.payload,
                loading:false


            };
        case GET_CATS:
            // alert(action.payload)
            return {
                ...state,
                categories:action.payload,

            };
        case GET_LIKES:
            return {
                ...state,
                likes:action.payload,

            };
        case UPDATE_LIKE:
            return {
                ...state,
                likes:action.payload,

            };

        default:
            return state;
    }
}
export default movieReducer;
