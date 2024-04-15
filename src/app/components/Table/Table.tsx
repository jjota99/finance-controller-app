import TableHeader from '@/app/components/Table/components/TableHeader/TableHeader'
import TableBody from '@/app/components/Table/components/TableBody/TableBody'
import { TAmountDetail, TTransaction, TTransactions } from '@/app/types/mainDashboard'
import TableFooter from '@/app/components/Table/components/TableFooter/TableFooter'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { api } from '@/app/api/api'
import { toast } from 'sonner'
import { AxiosResponse } from 'axios'
import { useAuthStore } from '@/app/stores/auth'

type Props = {
    columns: {
        key:
            | 'transactionName'
            | 'transactionDate'
            | 'transactionType'
            | 'transactionValue'
            | 'actions'
        label: string
    }[]
    rows: TTransaction[]
    setTransactions: Dispatch<SetStateAction<TTransactions | undefined>>
    setAmountDetail: Dispatch<SetStateAction<TAmountDetail | undefined>>
}

export default function Table({
    columns,
    rows,
    setTransactions,
    setAmountDetail,
}: Props) {
    const { getTokenInLocalStorage, user } = useAuthStore()
    const access_token = getTokenInLocalStorage()

    const handleDeleteTransactions = useCallback(
        async (id?: number, userId?: number | null) => {
            if (userId && id) {
                await api
                    .delete(`transactions/delete/id/${id}/user/${userId}/`, {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then(
                        (response) =>
                            response.status === 200 &&
                            toast.success('Transação excluída com sucesso!', {
                                className: 'bg-green-700 text-neutral-200',
                            })
                    )

                await api
                    .get(`transactions/amount-detail/${user.id}`, {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then((response: AxiosResponse<TAmountDetail, any>) =>
                        setAmountDetail(response.data)
                    )

                await api
                    .get(`transactions/${user.id}`, {
                        params: {
                            page: 1,
                            pageSize: 5,
                        },
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then((response: AxiosResponse<TTransactions, any>) =>
                        setTransactions(response.data)
                    )
            }
        },
        [user]
    )

    return (
        <table className="w-full">
            <TableHeader columns={columns} />
            <TableBody rows={rows} handleDeleteTransactions={handleDeleteTransactions} />
            <TableFooter pages={[1, 2, 3]} setTransactions={setTransactions} />
        </table>
    )
}
