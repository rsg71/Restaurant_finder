import axios from 'axios';
import { ILoginData, ISignupData } from '../interfaces';

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : process.env.REACT_APP_BACKEND_URL;

const API = {

    getData: function () {
        return axios.get(`${url}/api/status`)
    },
    testAuth: function () {
        return axios.get(`${url}/api/test_data`)
    },
    login: function (loginData: ILoginData) {
        return axios.post(`${url}/api/auth/login`, loginData)
    },
    signUp: function (signupData: ISignupData) {
        console.log(signupData)
        // return axios.post(`${url}/api/signup`, signupData)
        return axios.post(`${url}/api/auth/signup`, signupData, {
        })
    },
    searchRestaurants: function (city: string, type: string) {
        return axios.get(`${url}/api/restaurants`, { params: { city, type } })
    },

    getFavorites: function () {
        return axios.get(`${url}/api/restaurants`)
    },

    getUserData: function () {
        return axios.get(`${url}/api/user_data`)
    },

    addRestaurants: function (restaurants: any) {
        return axios.post(`${url}/api/restaurants`, restaurants, {})
    },
    getRestaurants: function () {
        return axios.get(`${url}/api/restaurants`, {})
    },
    logout: function () {
        return axios.get(`${url}/api/logout`)
    },
}

export default API;