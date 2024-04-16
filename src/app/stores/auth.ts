import { create, UseBoundStore } from 'zustand'
import { StoreApi } from 'zustand/vanilla'
import { TMeResponse } from '@/app/types/mainDashboard'

type TStoreState = {
    user: Partial<TMeResponse>
    setUser: (param: Partial<TMeResponse>) => void
    saveTokenInLocalStorage: (token?: string) => void
    getTokenInLocalStorage: () => string | null
}

export const useAuthStore: UseBoundStore<StoreApi<TStoreState>> = create<TStoreState>(
    (set) => ({
        user: {
            id: null,
            name: null,
            cpf: null,
        },
        setUser: (user) => {
            set({ user: user })
        },
        saveTokenInLocalStorage: (token?: string): void => {
            if (token) {
                window.localStorage.setItem('access_token', token)
            }
        },
        getTokenInLocalStorage: (): string | null => {
            const access_token = window.localStorage.getItem('access_token')
            return access_token
        },
    })
)
