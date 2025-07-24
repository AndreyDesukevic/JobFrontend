import axios from "axios"
import config from "../config.json"
import { store } from "../store"
import { HubConnectionBuilder } from "@microsoft/signalr"

const API_URL = `${config.API_BASE_URL}/searches`

function getToken() {
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
    console.log(res.data);
    return res.data
}

export const deleteSearch = async (id) => {
    const token = getToken()
    const res = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

export const runSearch = async (id, token) => {
    return axios.post(`${API_URL}/${id}/run`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const stopSearch = async (id, token) => {
    return axios.post(`${API_URL}/${id}/stop`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const createSignalRConnection = (token) => {
    return new HubConnectionBuilder()
        .withUrl(`${config.API_BASE_URL.replace('/api', '')}/searchStatusHub`, {
            accessTokenFactory: () => token
        })
        .withAutomaticReconnect()
        .build()
}