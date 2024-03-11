import { ApisauceInstance, create } from 'apisauce'

export const api: ApisauceInstance = create({
    baseURL: process.env.API_URL,
    headers: { Accept: 'application/vnd.github.v3+json' },
})
