import { ApisauceInstance, create } from 'apisauce'

export const api: ApisauceInstance = create({
    baseURL: 'http://localhost:8080/api',
    headers: { Accept: 'application/vnd.github.v3+json' },
    timeout: 30,
})
