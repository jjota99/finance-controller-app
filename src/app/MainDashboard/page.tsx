'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '@/app/api/api'
import { useAuthStore } from '@/app/stores/auth'
import { AxiosResponse } from 'axios'
import {
    TAmountCard,
    TAmountDetail,
    TMeResponse,
    TTransactions,
} from '@/app/types/mainDashboard'
import AmountCard from '@/app/components/AmountCard'
import Table from '@/app/components/Table/Table'
import NewTransaction from '@/app/components/NewTransaction/NewTransaction'
import Modal from '@/app/components/Modal/Modal'
import { ArrowsClockwise } from '@phosphor-icons/react'

export default function MainDashboard() {
    const [amountDetail, setAmountDetail] = useState<TAmountDetail>()
    const [transactions, setTransactions] = useState<TTransactions>()
    const [newTransacationModalIsOpen, setNewTransacationModalIsOpen] =
        useState<boolean>(false)

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

    const tableColumns: Array<{
        key:
            | 'transactionName'
            | 'transactionDate'
            | 'transactionType'
            | 'transactionValue'
            | 'actions'
        label: string
    }> = [
        {
            key: 'transactionName',
            label: 'Nome',
        },
        {
            key: 'transactionDate',
            label: 'Data',
        },
        {
            key: 'transactionType',
            label: 'Tipo',
        },
        {
            key: 'transactionValue',
            label: 'Valor',
        },
        {
            key: 'actions',
            label: 'Ações',
        },
    ]

    const tablePages = useMemo(() => {
        const total = transactions?.total
        if (total) {
            const pageNumbers = Math.ceil(total / 10)
            const pageNumbersList = []

            for (let i = 0; i < pageNumbers; i++) {
                pageNumbersList.push(i + 1)
            }

            return pageNumbersList
        }
    }, [transactions])

    const handleFetchTransactions = useCallback(() => {
        if (user.id) {
            api.get(`transactions/amount-detail/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }).then((response: AxiosResponse<TAmountDetail, any>) =>
                setAmountDetail(response.data)
            )

            api.get(`transactions/${user.id}`, {
                params: {
                    page: 1,
                    pageSize: 10,
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }).then((response: AxiosResponse<TTransactions, any>) =>
                setTransactions(response.data)
            )
        }
    }, [user])

    const tableScopeMemo = useMemo(() => {
        if (transactions && transactions.data.length > 0) {
            return (
                <Table
                    columns={tableColumns}
                    tablePages={tablePages && tablePages}
                    rows={transactions?.data || []}
                    setTransactions={setTransactions}
                    setAmountDetail={setAmountDetail}
                />
            )
        }

        return (
            <div className="w-full bg-neutral-900 h-[200px] flex items-center justify-center rounded">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <span className="text-neutral-200 text-2xl">Não há dados</span>
                    <ArrowsClockwise
                        role="button"
                        onClick={() => handleFetchTransactions()}
                        className="text-3xl text-neutral-200 cursor-pointer"
                    />
                </div>
            </div>
        )
    }, [transactions])

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

            api.get(`transactions/${user.id}`, {
                params: {
                    page: 1,
                    pageSize: 10,
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }).then((response: AxiosResponse<TTransactions, any>) =>
                setTransactions(response.data)
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

                <div className="w-full flex flex-col gap-y-2">
                    <span
                        role="button"
                        className="text-green-600 text-right hover:text-green-700"
                        onClick={() => setNewTransacationModalIsOpen(true)}
                    >
                        + Nova transação
                    </span>

                    {tableScopeMemo}
                </div>
            </div>

            <Modal
                title="Nova transação"
                content={
                    <NewTransaction
                        setTransactions={setTransactions}
                        setAmountDetail={setAmountDetail}
                        setOpen={setNewTransacationModalIsOpen}
                    />
                }
                open={newTransacationModalIsOpen}
                setOpen={setNewTransacationModalIsOpen}
            />
        </main>
    )
}
