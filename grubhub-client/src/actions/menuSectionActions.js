import { ADD_MENU_SECTION, EDIT_MENU_SECTION, DELETE_MENU_SECTION, GET_MENU_SECTIONS } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const getMenuSections = () => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.get(`${backendServer}/grubhub/menu/sections/${localStorage.getItem("user_id")}`)
        .then(response => response.data)
        .then(sections => dispatch({
            type: GET_MENU_SECTIONS,
            payload: sections
        }))
        .catch(err => {
            console.log(err);
        });
}

export const addMenuSection = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/menu/sections`, data)
        .then(response => response.data)
        .then(status => dispatch({
            type: ADD_MENU_SECTION,
            payload: status
        }))
        .catch(err => {
            if (err.response && err.response.data) {
                return dispatch({
                    type: ADD_MENU_SECTION,
                    payload: err.response.data
                });
            }
        });
}

export const editMenuSection = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/menu/sectionsupdate`, data)
        .then(response => response.data)
        .then(status => dispatch({
            type: EDIT_MENU_SECTION,
            payload: status
        }))
        .catch(err => {
            if (err.response && err.response.data) {
                return dispatch({
                    type: EDIT_MENU_SECTION,
                    payload: err.response.data
                });
            }
        });
}

export const deleteMenuSection = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/menu/sectiondelete`, data)
        .then(response => response.data)
        .then(status => dispatch({
            type: DELETE_MENU_SECTION,
            payload: status
        }))
        .catch(err => {
            console.log(err);
        });
}