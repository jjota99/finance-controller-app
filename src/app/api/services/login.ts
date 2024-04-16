import { api, API_RESPONSE_ENUM } from '@/app/api/api'
import { AxiosResponse } from 'axios'
import { TLoginForm } from '@/app/types/login'
import { TMeResponse } from '@/app/types/mainDashboard'

const createAccountRequest = async (
    data: TLoginForm
): Promise<{ status: API_RESPONSE_ENUM; message?: string } | undefined> => {
    return await api
        .post('/users', data)
        .then((response: AxiosResponse<void, TLoginForm>) => {
            if (response.status === 200) {
                return { status: API_RESPONSE_ENUM.SUCCESS }
            }
        })
        .catch((error) => {
            return {
                status: API_RESPONSE_ENUM.ERROR,
                message: error.response.data.message,
            }
        })
}

const loginRequest = async (
    data: TLoginForm,
    access_token: string | null
): Promise<
    { status: API_RESPONSE_ENUM; message?: string; data?: string } | undefined
> => {
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
                message: error.response.data.message,
            }
        })
}

const meRequest = async (
    access_token: string | null
): Promise<{ status: API_RESPONSE_ENUM; data?: Partial<TMeResponse> } | undefined> => {
    return await api
        .get('/auth/me', { params: { token: access_token } })
        .then((response: AxiosResponse<Partial<TMeResponse>, { token: string }>) => {
            if (response.status === 200) {
                return { status: API_RESPONSE_ENUM.SUCCESS, data: response?.data }
            }
        })
}

export { createAccountRequest, loginRequest, meRequest }
