import { create, UseBoundStore } from 'zustand'
import { StoreApi } from 'zustand/vanilla'

type TStoreState = {
    saveTokenInLocalStorage: (token: string) => void
    getTokenInLocalStorage: () => string | null
}

export const useAuthStore: UseBoundStore<StoreApi<TStoreState>> = create<TStoreState>(
    (set) => ({
        saveTokenInLocalStorage: (token?: string): void => {
            const {
                localStorage: { setItem },
            } = window

            if (token) {
                setItem('access_token', token)
            }
        },

        getTokenInLocalStorage: (): string | null => {
            const {
                localStorage: { getItem },
            } = window

            return getItem('access_token')
        },
    })
)
