import TableHeader from '@/app/components/Table/components/TableHeader/TableHeader'
import TableBody from '@/app/components/Table/components/TableBody/TableBody'
import { TTransactions } from '@/app/types/mainDashboard'
import TableFooter from '@/app/components/Table/components/TableFooter/TableFooter'

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
            <TableFooter pages={[1, 2, 3]} />
        </table>
    )
}
