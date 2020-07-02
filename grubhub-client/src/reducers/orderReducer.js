import { PLACE_ORDER, GET_PAST_ORDERS, GET_CURRENT_ORDERS, CHANGE_ORDER_STATUS } from '../actions/types';

const initialState = {
    order_status: {},
    orders_list: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PLACE_ORDER:
            return {
                ...state,
                order_status: action.payload
            };
        case GET_PAST_ORDERS:
            return {
                ...state,
                orders_list: action.payload
            };
        case GET_CURRENT_ORDERS:
            return {
                ...state,
                orders_list: action.payload
            };
        case CHANGE_ORDER_STATUS:
            return {
                ...state,
                orders_list: action.payload
            };
        default:
            return state;
    }
};