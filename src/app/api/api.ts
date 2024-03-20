import axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { Accept: 'application/vnd.github.v3+json' },
    timeout: 30,
})
