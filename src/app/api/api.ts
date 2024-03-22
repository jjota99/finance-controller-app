import axios, { AxiosInstance } from 'axios'

const access_token = window.localStorage.getItem('access_token')

export const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { Authorization: `Bearer: ${access_token}` },
})
