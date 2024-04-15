import { ReactElement } from 'react'
import clsx from 'clsx'
import { TTransactions } from '@/app/types/mainDashboard'

type Props = {
    rows: Array<{
        transactionName: string
        transactionDate: string
        transactionType: string
        transactionValue: string
    }>
}

export default function TableBody({ rows }: Props): ReactElement {
    return (
        <tbody>
            {rows.map((row, index) => (
                <tr
                    key={index}
                    className={clsx(
                        'text-center',
                        'bg-neutral-900',
                        row !== rows[rows.length - 1] && 'border-y border-y-neutral-700'
                    )}
                >
                    <td className="py-4 text-neutral-200">{row.transactionName}</td>
                    <td className="py-4 text-neutral-200">{row.transactionDate}</td>
                    <td
                        className={clsx(
                            'py-4',
                            row.transactionType === 'Saida'
                                ? 'text-red-500'
                                : 'text-green-500'
                        )}
                    >
                        {row.transactionType}
                    </td>
                    <td
                        className={clsx(
                            'py-4',
                            row.transactionType === 'Saida'
                                ? 'text-red-500'
                                : 'text-green-500'
                        )}
                    >
                        {row.transactionValue}
                    </td>
                </tr>
            ))}
        </tbody>
    )
}
