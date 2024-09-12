import axios from "axios";

const accountsAPI = axios.create({
    baseURL : 'http://127.0.0.1:8000/api/'
})

export const registerUserAPI = (data) => accountsAPI.post('register/',data)
export const loginUserAPI = (data) => accountsAPI.post('login/',data)
export const UserInfoAPI = (data) => accountsAPI.get('user/',data)
export const UserLogoutAPI = (data, config) => accountsAPI.post('logout/', data, config)