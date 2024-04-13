import { ReactElement } from 'react'

type Props = {
    columns: Array<{
        label: string
        key:
            | 'transactionName'
            | 'transactionDate'
            | 'transactionType'
            | 'transactionValue'
    }>
}

export default function TableHeader({ columns }: Props): ReactElement {
    return (
        <thead className="w-full bg-neutral-900">
            {columns.map((col) => (
                <th className="py-4 text-neutral-200" key={col.key}>
                    {col.label}
                </th>
            ))}
        </thead>
    )
}
