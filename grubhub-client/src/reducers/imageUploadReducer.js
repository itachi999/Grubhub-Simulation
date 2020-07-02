import { UPLOAD_USER_IMAGE, UPLOAD_RESTAURANT_IMAGE, UPLOAD_ITEM_IMAGE } from '../actions/types';

const initialState = {
    user_image: {},
    res_image: {},
    item_image: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPLOAD_USER_IMAGE:
            return {
                ...state,
                user_image: action.payload
            };
        case UPLOAD_RESTAURANT_IMAGE:
            return {
                ...state,
                res_image: action.payload
            };
        case UPLOAD_ITEM_IMAGE:
            return {
                ...state,
                item_image: action.payload
            };
        default:
            return state;
    }
};