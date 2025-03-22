import axios from 'axios';
import { SERVER_URL } from '../constants';


const BASE_URL = SERVER_URL

const api = axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
})

api.interceptors.response.use(
    (response) => response,
    async error => {
        const original_request = error.config

        if (error.response?.status === 401 && !original_request._retry){
            original_request._retry = true
            try {
                await refresh_token()
                return api(original_request)
            }catch (refreshError){
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export const get_user_profile = async (username) =>{
    const response = await api.get(`/user_data/${username}/`)
    return response.data
}

const refresh_token = async () => {
    const response = await api.post('/token/refresh/')
    return response.data
}

export const login = async (username, password) => {
    const response = await api.post('/token/', {username, password})
    return response.data
}

export const register = async (username, email, first_name, last_name, password) => {
    const response = await api.post('/register/', {username, email, first_name, last_name, password})
    return response.data
}

export const get_auth = async () =>{
    const response = await api.get(`/authenticated/`)
    return response.data
}

export const toggleLike = async (set_num, name, pieces, img_url) => {
    const response = await api.post('/toggle_like/', {set_num, name, pieces, img_url})
    return response.data
}

export const toggleSave = async (set_num, name, pieces, img_url) => {
    const response = await api.post('/toggle_save/', {set_num, name, pieces, img_url})
    return response.data
}


export const get_username = async () =>{
    const response = await api.get(`/get_username/`)
    return response.data
}

export const get_legoset_comments = async (set_num) =>{
    const response = await api.get(`get_set_comments/${set_num}`)
    return response.data
}

// make comment endpoint
export const post_legoset_comment = async (content, set_num, name, pieces, img_url) =>{
    const response = await api.post(`post_legoset_comment/`, {content, set_num, name, pieces, img_url})
    return response.data
}

export const logout = async () => {
    const response = await api.post('/logout/')
    response.data
}

export const update_user = async (values) => {
    const response = await api.patch('/update_user/', values, { headers: {'Content-Type': 'multipart/form-data'}})
    return response.data
}