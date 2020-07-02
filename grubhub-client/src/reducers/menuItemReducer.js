import { ADD_MENU_ITEM, EDIT_MENU_ITEM, DELETE_MENU_ITEM } from '../actions/types';

const initialState = {
    item: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MENU_ITEM:
            return {
                ...state,
                item: action.payload
            };
        case EDIT_MENU_ITEM:
            return {
                ...state,
                item: action.payload
            };
        case DELETE_MENU_ITEM:
            return {
                ...state,
                item: action.payload
            };
        default:
            return state;
    }
};