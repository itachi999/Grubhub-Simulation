import { UPLOAD_USER_IMAGE, UPLOAD_RESTAURANT_IMAGE, UPLOAD_ITEM_IMAGE } from '../actions/types';
import backendServer from "../webConfig"
import axios from "axios";

export const uploadUserImage = (formData, uploadConfig) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/uploads/user/${localStorage.getItem("user_id")}`, formData, uploadConfig)
        .then(response => response.data)
        .then(image => dispatch({
            type: UPLOAD_USER_IMAGE,
            payload: image
        }))
        .catch(err => {
            console.log("Error");
        });
}

export const uploadRestaurantImage = (formData, uploadConfig) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/uploads/restaurant/${localStorage.getItem("user_id")}`, formData, uploadConfig)
        .then(response => response.data)
        .then(image => dispatch({
            type: UPLOAD_RESTAURANT_IMAGE,
            payload: image
        }))
        .catch(err => {
            console.log(err);
        });
}

export const uploadItemImage = (formData, uploadConfig) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/uploads/item`, formData, uploadConfig)
        .then(response => response.data)
        .then(image => dispatch({
            type: UPLOAD_ITEM_IMAGE,
            payload: image
        }))
        .catch(err => {
            console.log(err);
        });
}