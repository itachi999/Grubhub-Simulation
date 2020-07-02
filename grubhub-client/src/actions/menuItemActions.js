import { ADD_MENU_ITEM, EDIT_MENU_ITEM, DELETE_MENU_ITEM } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const addMenuItem = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/menu/items`, data)
        .then(response => response.data)
        .then(status => dispatch({
            type: ADD_MENU_ITEM,
            payload: status
        }))
        .catch(err => {
            if (err.response && err.response.data) {
                return dispatch({
                    type: ADD_MENU_ITEM,
                    payload: err.response.data
                });
            }
        });
}

export const editMenuItem = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/menu/itemsupdate`, data)
        .then(response => response.data)
        .then(status => dispatch({
            type: EDIT_MENU_ITEM,
            payload: status
        }))
        .catch(err => {
            if (err.response && err.response.data) {
                return dispatch({
                    type: EDIT_MENU_ITEM,
                    payload: err.response.data
                });
            }
        });
}

export const deleteMenuItem = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/menu/itemdelete`, data)
        .then(response => response.data)
        .then(status => dispatch({
            type: DELETE_MENU_ITEM,
            payload: status
        }))
        .catch(err => {
            console.log(err);
        });
}