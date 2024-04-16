import TableHeader from '@/app/components/Table/components/TableHeader/TableHeader'
import TableBody from '@/app/components/Table/components/TableBody/TableBody'
import { TAmountDetail, TTransaction, TTransactions } from '@/app/types/mainDashboard'
import TableFooter from '@/app/components/Table/components/TableFooter/TableFooter'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { API_RESPONSE_ENUM } from '@/app/api/api'
import { useAuthStore } from '@/app/stores/auth'
import { deleteTransactionRequest } from '@/app/api/services/MainDashboard'
import { toast } from 'sonner'

type Props = {
    handleFetchTransactions: () => void
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
    tablePages?: number[]
    setTransactions: Dispatch<SetStateAction<TTransactions | undefined>>
    setAmountDetail: Dispatch<SetStateAction<TAmountDetail | undefined>>
}

export default function Table({
    handleFetchTransactions,
    columns,
    rows,
    tablePages,
    setTransactions,
}: Props) {
    const { getTokenInLocalStorage, user } = useAuthStore()
    const access_token = getTokenInLocalStorage()

    const handleDeleteTransactions = useCallback(
        async (id?: number, userId?: number | null) => {
            if (userId && id) {
                const deleteTransacationReq = await deleteTransactionRequest(
                    id,
                    userId,
                    access_token
                )

                if (deleteTransacationReq?.status === API_RESPONSE_ENUM.SUCCESS) {
                    toast.success('Transação excluída com sucesso!', {
                        className: 'bg-green-700 text-neutral-200',
                    })
                    handleFetchTransactions()

                    return
                }

                toast.success(deleteTransacationReq?.message, {
                    className: 'bg-red-700 text-neutral-200',
                })
            }
        },
        [user]
    )

    return (
        <table className="w-full">
            <TableHeader columns={columns} />
            <TableBody rows={rows} handleDeleteTransactions={handleDeleteTransactions} />
            <TableFooter pages={tablePages} setTransactions={setTransactions} />
        </table>
    )
}
