import { ADD_MENU_SECTION, EDIT_MENU_SECTION, DELETE_MENU_SECTION, GET_MENU_SECTIONS } from '../actions/types';

const initialState = {
    section: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MENU_SECTION:
            return {
                ...state,
                section: action.payload
            };
        case EDIT_MENU_SECTION:
            return {
                ...state,
                section: action.payload
            };
        case DELETE_MENU_SECTION:
            return {
                ...state,
                section: action.payload
            };
        case GET_MENU_SECTIONS:
            return {
                ...state,
                section: action.payload
            };
        default:
            return state;
    }
};