import { create } from 'zustand'

type TStoreState = {
    created: boolean
}

export const useAuthStore = create<TStoreState>((set) => ({
    created: true,
}))
