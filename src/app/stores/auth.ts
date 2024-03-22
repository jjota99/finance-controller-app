import { create, UseBoundStore } from 'zustand'
import { StoreApi } from 'zustand/vanilla'

type TStoreState = {
    saveTokenInLocalStorage: (token: string) => void
    getTokenInLocalStorage: () => string | null
}

export const useAuthStore: UseBoundStore<StoreApi<TStoreState>> = create<TStoreState>(
    (set) => ({
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
