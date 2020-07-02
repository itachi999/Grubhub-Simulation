import { SEARCH_RESTAURANT, GET_RESTAURANT } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const searchRestaurant = (search_input) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.get(`${backendServer}/grubhub/restaurant/restaurantsearch/${search_input}`)
        .then(response => {
            var cuisines = [];
            if (response.data) {
                if (response.data === 'NO_RECORD') {
                    return {
                        noRecord: true
                    };
                }
                else {
                    for (var i = 0; i < response.data.length; i++) {
                        if (!cuisines.includes(response.data[i].res_cuisine))
                            cuisines.push(response.data[i].res_cuisine)
                    }
                    return {
                        restaurantList: response.data,
                        cuisineList: cuisines
                    };
                }
            }
        })
        .then(search_result => dispatch({
            type: SEARCH_RESTAURANT,
            payload: search_result
        }))
        .catch(error => {
            console.log(error);
        });
}

export const getRestaurant = (res_id) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.get(`${backendServer}/grubhub/restaurant/${res_id}`)
        .then(response => response.data)
        .then(restaurant => dispatch({
            type: GET_RESTAURANT,
            payload: restaurant
        }))
        .catch(error => {
            console.log(error);
        });
}