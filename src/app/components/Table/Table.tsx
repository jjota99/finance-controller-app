import TableHeader from '@/app/components/Table/components/TableHeader/TableHeader'
import TableBody from '@/app/components/Table/components/TableBody/TableBody'
import { TTransactions } from '@/app/types/mainDashboard'

type Props = {
    columns: {
        key:
            | 'transactionName'
            | 'transactionDate'
            | 'transactionType'
            | 'transactionValue'
        label: string
    }[]
    rows: TTransactions[]
}

export default function Table({ columns, rows }: Props) {
    return (
        <table className="w-full">
            <TableHeader columns={columns} />
            <TableBody rows={rows} />
        </table>
    )
}
