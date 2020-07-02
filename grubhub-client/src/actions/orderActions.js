import { PLACE_ORDER, GET_PAST_ORDERS, GET_CURRENT_ORDERS, CHANGE_ORDER_STATUS } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const placeOrder = (orderdata) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/cart/placeorder`, orderdata)
        .then(response => {
            if (response.data === "ORDER_PLACED") {
                localStorage.removeItem("cart_items");
                localStorage.removeItem("cart_res_id");
                return response.data
            }
        })
        .then(status => dispatch({
            type: PLACE_ORDER,
            payload: status
        }))
        .catch(error => {
            console.log(error);
            return dispatch({
                type: PLACE_ORDER,
                payload: "ORDER_ERROR"
            });
        });
}

export const getCustomerPastOrders = () => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.get(`${backendServer}/grubhub/orders/completedorders/${localStorage.getItem("user_id")}`)
        .then(response => response.data)
        .then(orders => dispatch({
            type: GET_PAST_ORDERS,
            payload: orders
        }))
        .catch(err => {
            console.log(err);
        });
}

export const getCustomerCurrentOrders = () => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.get(`${backendServer}/grubhub/orders/pendingorders/${localStorage.getItem("user_id")}`)
        .then(response => response.data)
        .then(orders => dispatch({
            type: GET_CURRENT_ORDERS,
            payload: orders
        }))
        .catch(err => {
            console.log(err);
        });
}

export const getOwnerPastOrders = () => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.get(`${backendServer}/grubhub/orders/completedorders/restaurant/${localStorage.getItem("user_id")}`)
        .then(response => response.data)
        .then(orders => dispatch({
            type: GET_PAST_ORDERS,
            payload: orders
        }))
        .catch(err => {
            console.log(err);
        });
}

export const getOwnerCurrentOrders = () => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.get(`${backendServer}/grubhub/orders/pendingorders/restaurant/${localStorage.getItem("user_id")}`)
        .then(response => response.data)
        .then(orders => dispatch({
            type: GET_CURRENT_ORDERS,
            payload: orders
        }))
        .catch(err => {
            console.log(err);
        });
}

export const changeOrderStatus = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/orders/orderstatus`, data)
        .then(response => response.data)
        .then(order_status => dispatch({
            type: CHANGE_ORDER_STATUS,
            payload: order_status
        }))
        .catch(err => {
            return dispatch({
                type: CHANGE_ORDER_STATUS,
                payload: "ORDER_ERROR"
            });
        });
}