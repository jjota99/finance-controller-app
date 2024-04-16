import { api, API_RESPONSE_ENUM } from '@/app/api/api'
import { AxiosResponse } from 'axios'
import { TLoginForm } from '@/app/types/login'

const createAccountRequest = async (
    data: TLoginForm
): Promise<{ status: API_RESPONSE_ENUM } | undefined> => {
    return await api
        .post('/users', data)
        .then((response: AxiosResponse<void, TLoginForm>) => {
            if (response.status === 200) {
                return { status: API_RESPONSE_ENUM.SUCCESS }
            }
        })
        .catch((error) => {
            return { status: API_RESPONSE_ENUM.ERROR }
        })
}

const loginRequest = async (
    data: TLoginForm,
    access_token: string | null
): Promise<{ status: API_RESPONSE_ENUM; data?: string } | undefined> => {
    return await api
        .post('/auth/sign-in', { ...data, token: access_token })
        .then((response: AxiosResponse<{ access_token: string }, TLoginForm>) => {
            if (response.status === 200) {
                return {
                    status: API_RESPONSE_ENUM.SUCCESS,
                    data: response?.data?.access_token,
                }
            }
        })
        .catch((error) => {
            return {
                status: API_RESPONSE_ENUM.ERROR,
            }
        })
}

export { createAccountRequest, loginRequest }
