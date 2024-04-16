import axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
})

export enum API_RESPONSE_ENUM {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}
