import { Dispatch, ReactElement, SetStateAction, useCallback } from 'react'
import { TTransactions } from '@/app/types/mainDashboard'
import { API_RESPONSE_ENUM } from '@/app/api/api'
import { useAuthStore } from '@/app/stores/auth'
import { getTransactionsRequest } from '@/app/api/services/MainDashboard'

type Props = {
    pages?: number[]
    setTransactions: Dispatch<SetStateAction<TTransactions | undefined>>
}

export default function TableFooter({ pages, setTransactions }: Props): ReactElement {
    const { getTokenInLocalStorage, user } = useAuthStore()
    const access_token = getTokenInLocalStorage()

    const onPageChange = useCallback(
        async (page: number) => {
            if (user.id) {
                const { id } = user
                const getTransactionsReq = await getTransactionsRequest(
                    id,
                    access_token,
                    page
                )

                if (getTransactionsReq?.status === API_RESPONSE_ENUM.SUCCESS) {
                    setTransactions(getTransactionsReq.data)
                }
            }
        },
        [setTransactions, user]
    )

    return (
        <tfoot>
            <tr className="flex py-4 gap-2 justify-start items-center end">
                <td className="flex gap-x-2">
                    {pages?.map((page) => (
                        <div
                            key={page}
                            onClick={() => onPageChange(page)}
                            className="px-2 border border-1 border-neutral-700 rounded cursor-pointer hover:bg-neutral-900 text-neutral-200"
                        >
                            <span>{page}</span>
                        </div>
                    ))}
                </td>
            </tr>
        </tfoot>
    )
}
