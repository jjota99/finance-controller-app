import { Dispatch, ReactElement, SetStateAction, useCallback } from 'react'
import { TTransactions } from '@/app/types/mainDashboard'
import { api } from '@/app/api/api'
import { AxiosResponse } from 'axios'
import { useAuthStore } from '@/app/stores/auth'

type Props = {
    pages: number[]
    setTransactions: Dispatch<SetStateAction<TTransactions | undefined>>
}

export default function TableFooter({ pages, setTransactions }: Props): ReactElement {
    const { getTokenInLocalStorage, user } = useAuthStore()
    const access_token = getTokenInLocalStorage()

    const onPageChange = useCallback(
        (page: number) => {
            if (user) {
                return api
                    .get(`transactions/${user.id}`, {
                        params: {
                            page,
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
        [setTransactions, user]
    )

    return (
        <tfoot>
            <tr className="flex py-4 gap-2 justify-start items-center end">
                <td className="flex gap-x-2">
                    {pages.map((page) => (
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
