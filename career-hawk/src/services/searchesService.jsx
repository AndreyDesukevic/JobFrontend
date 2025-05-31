import axios from "axios"
import config from "../config.local.json"
import { store } from "../store"

const API_URL = `${config.API_BASE_URL}/searches`

function getToken() {
    // Предполагается, что токен лежит в state.auth.access_token
    return store.getState().auth.access_token
}

export const createSearch = async (data) => {
    const token = getToken()
    const res = await axios.post(API_URL, data, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

export const getSearches = async (params = { host: "hh.ru", locale: "RU" }) => {
    const token = getToken()
    console.log(token)
    const res = await axios.get(API_URL, {
        params,
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

export const deleteSearch = async (id) => {
    const token = getToken()
    const res = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}