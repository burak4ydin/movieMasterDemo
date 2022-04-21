import { COUNTER_CHANGE,GET_MOVIES,GET_CATS } from '../actions/index';
const initialState = {
    count: 0,
    movies:[],
    categories:[]
};
const countReducer = (state = initialState, action) => {
    switch(action.type) {
        case COUNTER_CHANGE:
            return {
                ...state,
                count:action.payload
            };
        case GET_MOVIES:
            return {
                ...state,
                movies:action.payload
            };
        case GET_CATS:
            return {
                ...state,
                categories:action.payload
            };
        default:
            return state;
    }
}
export default countReducer;
