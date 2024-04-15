import TableHeader from '@/app/components/Table/components/TableHeader/TableHeader'
import TableBody from '@/app/components/Table/components/TableBody/TableBody'
import { TTransactions } from '@/app/types/mainDashboard'
import TableFooter from '@/app/components/Table/components/TableFooter/TableFooter'
import { Dispatch, SetStateAction } from 'react'

type Props = {
    columns: {
        key:
            | 'transactionName'
            | 'transactionDate'
            | 'transactionType'
            | 'transactionValue'
        label: string
    }[]
    rows: Array<{
        transactionName: string
        transactionDate: string
        transactionType: string
        transactionValue: string
    }>
    setTransactions: Dispatch<SetStateAction<TTransactions | undefined>>
}

export default function Table({ columns, rows, setTransactions }: Props) {
    return (
        <table className="w-full">
            <TableHeader columns={columns} />
            <TableBody rows={rows} />
            <TableFooter pages={[1, 2, 3]} setTransactions={setTransactions} />
        </table>
    )
}
