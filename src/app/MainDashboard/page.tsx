'use client'

import { useEffect, useState } from 'react'
import { api } from '@/app/api/api'
import { useAuthStore } from '@/app/stores/auth'
import { AxiosResponse } from 'axios'
import { TAmountCard, TAmountDetail, TMeResponse } from '@/app/types/mainDashboard'
import AmountCard from '@/app/MainDashboard/components/AmountCard'

export default function MainDashboard() {
    const [amountDetail, setAmountDetail] = useState<TAmountDetail>()

    const { getTokenInLocalStorage, setUser, user } = useAuthStore()
    const access_token = getTokenInLocalStorage()

    const amountCards: TAmountCard[] = [
        { title: 'Entrada', value: amountDetail?.income, type: 'income' },
        { title: 'Saida', value: amountDetail?.outcome, type: 'outcome' },
        { title: 'Total', value: amountDetail?.total, type: 'total' },
    ]

    useEffect(() => {
        api.get('/auth/me', { params: { token: access_token } })
            .then((response: AxiosResponse<Partial<TMeResponse>, { token: string }>) =>
                setUser(response.data)
            )
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        if (user.id) {
            api.get(`transactions/amount-detail/${user.id}`)
                .then((response: AxiosResponse<TAmountDetail, any>) =>
                    setAmountDetail(response.data)
                )
                .catch((error) => console.log(error))
        }
    }, [user.id])

    return (
        <main className="w-full h-full flex flex-col gap-8 p-8">
            <h1 className="text-neutral-200 text-xl">Olá, {user.name}!</h1>

            <div className="flex flex-1 flex-col items-center gap-16">
                <div className="w-full flex flex-1 gap-4">
                    {amountCards.map((card, index) => (
                        <AmountCard
                            title={card.title}
                            key={index}
                            value={card.value}
                            type={card.type}
                        />
                    ))}
                </div>

                <div>Tabela</div>
            </div>
        </main>
    )
}
