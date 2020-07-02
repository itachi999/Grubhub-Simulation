import { SEARCH_RESTAURANT, GET_RESTAURANT } from '../actions/types';

const initialState = {
    restaurant_data: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_RESTAURANT:
            return {
                ...state,
                restaurant_data: action.payload
            };
        case GET_RESTAURANT:
            return {
                ...state,
                restaurant_data: action.payload
            };
        default:
            return state;
    }
};