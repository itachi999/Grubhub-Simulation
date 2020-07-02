import { GET_MESSAGES, SEND_MESSAGE } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const sendMessage = (messagedata) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/messages`, messagedata)
        .then(response => response.data)
        .then(status => dispatch({
            type: SEND_MESSAGE,
            payload: status
        }))
        .catch(err => {
            console.log(err);
        });
}

export const getMessages = (order_id) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.get(`${backendServer}/grubhub/messages/${order_id}`)
        .then(response => response.data)
        .then(messages => dispatch({
            type: GET_MESSAGES,
            payload: messages
        }))
        .catch(err => {
            console.log(err);
        });
}