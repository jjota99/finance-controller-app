import { Dispatch, ReactElement, SetStateAction, useCallback, useState } from 'react'
import clsx from 'clsx'
import { TTransaction, TTransactions } from '@/app/types/mainDashboard'
import { Trash } from '@phosphor-icons/react'
import { api } from '@/app/api/api'
import { useAuthStore } from '@/app/stores/auth'

type Props = {
    rows: TTransaction[]
    handleDeleteTransactions: (id?: number, userId?: number | null) => void
}

export default function TableBody({
    rows,
    handleDeleteTransactions,
}: Props): ReactElement {
    const { user } = useAuthStore()

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
                        {row.transactionType === 'Saida' && '-'}R${' '}
                        {row.transactionValue
                            .toString()
                            .substring(row.transactionType === 'positive' ? 1 : 2)}
                    </td>
                    <td className="py-4 flex justify-center">
                        {
                            <Trash
                                role="button"
                                className="cursor-pointer text-red-500 hover:text-red-400"
                                onClick={() =>
                                    handleDeleteTransactions(row?.transactionId, user.id)
                                }
                            />
                        }
                    </td>
                </tr>
            ))}
        </tbody>
    )
}
