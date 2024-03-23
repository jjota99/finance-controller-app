'use client'

import { useEffect } from 'react'
import { api } from '@/app/api/api'
import { useAuthStore } from '@/app/stores/auth'
import { AxiosResponse } from 'axios'
import { TMeResponse } from '@/app/types/mainDashboard'

export default function MainDashboard() {
    const { getTokenInLocalStorage, setUser, user } = useAuthStore()
    const access_token = getTokenInLocalStorage()

    useEffect(() => {
        api.get('/auth/me', { params: { token: access_token } })
            .then((response: AxiosResponse<Partial<TMeResponse>, { token: string }>) =>
                setUser(response.data)
            )
            .catch((error) => console.log(error))
    }, [])

    return (
        <div>
            <h1 className="text-white">Olá, {user.name}!</h1>
        </div>
    )
}
