import { GET_PROFILE, UPDATE_PROFILE } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const getCustomer = () => dispatch => {
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backendServer}/grubhub/profile/customer/${localStorage.getItem("user_id")}`)
        .then(response => response.data)
        .then(customer => dispatch({
            type: GET_PROFILE,
            payload: customer
        }))
        .catch(error => {
            console.log(error);
        });
}

export const updateCustomer = (customerProfileData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/profile/customer`, customerProfileData)
        .then(response => response.data)
        .then(data => {
            if (data === 'CUSTOMER_UPDATED') {
                localStorage.setItem("name", customerProfileData.name);
                alert("Profile Updated Successfully!");
            }
            return dispatch({
                type: UPDATE_PROFILE,
                payload: data
            })
        })
        .catch(error => {
            console.log(error);
        });
}

export const getOwner = () => dispatch => {
    axios.defaults.headers.common['authorization']= localStorage.getItem("token");
    axios.get(`${backendServer}/grubhub/profile/restaurant/${localStorage.getItem("user_id")}`)
        .then(response => response.data)
        .then(owner => dispatch({
            type: GET_PROFILE,
            payload: owner
        }))
        .catch(error => {
            console.log(error);
        });
}

export const updateOwner = (ownerProfileData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.post(`${backendServer}/grubhub/profile/restaurant`, ownerProfileData)
        .then(response => response.data)
        .then(data => {
            if (data === 'RESTAURANT_UPDATED') {
                localStorage.setItem("name", ownerProfileData.name);
                alert("Profile Updated Successfully!");
            }
            return dispatch({
                type: UPDATE_PROFILE,
                payload: data
            })
        })
        .catch(error => {
            console.log(error);
        });
}