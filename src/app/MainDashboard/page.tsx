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
        {
            title: 'Entrada',
            value: amountDetail?.income?.value,
            status: amountDetail?.income?.status,
        },
        {
            title: 'Saida',
            value: amountDetail?.outcome?.value,
            status: amountDetail?.outcome?.status,
        },
        {
            title: 'Total',
            value: amountDetail?.total?.value,
            status: amountDetail?.total?.status,
        },
    ]

    useEffect(() => {
        api.get('/auth/me', { params: { token: access_token } }).then(
            (response: AxiosResponse<Partial<TMeResponse>, { token: string }>) =>
                setUser(response.data)
        )
    }, [])

    useEffect(() => {
        if (user.id) {
            api.get(`transactions/amount-detail/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }).then((response: AxiosResponse<TAmountDetail, any>) =>
                setAmountDetail(response.data)
            )
        }
    }, [user.id])

    return (
        <main className="w-full h-full flex flex-col gap-8 p-8">
            <h1 className="text-neutral-200 text-xl font-semibold">Olá, {user.name}!</h1>

            <div className="flex flex-1 flex-col items-center gap-16">
                <div className="w-full flex flex-1 gap-4">
                    {amountCards.map((card, index) => (
                        <AmountCard
                            title={card.title}
                            key={index}
                            value={card.value}
                            status={card.status}
                        />
                    ))}
                </div>

                <div>Tabela</div>
            </div>
        </main>
    )
}
