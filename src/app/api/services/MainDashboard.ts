import { api, API_RESPONSE_ENUM } from '@/app/api/api'
import { AxiosResponse } from 'axios'
import { TAmountDetail, TTransaction, TTransactions } from '@/app/types/mainDashboard'

const getTransactionsRequest = async (
    userId: number,
    access_token: string | null
): Promise<{ status: API_RESPONSE_ENUM; data?: TTransactions } | undefined> => {
    return await api
        .get(`transactions/${userId}`, {
            params: {
                page: 1,
                pageSize: 10,
            },
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        .then((response: AxiosResponse<TTransactions, any>) => {
            if (response.status === 200) {
                return { status: API_RESPONSE_ENUM.SUCCESS, data: response.data }
            }
        })
        .catch((error) => {
            return { status: API_RESPONSE_ENUM.ERROR }
        })
}

const getTransactionsAmountRequest = async (
    userId: number,
    access_token: string | null
): Promise<{ status: API_RESPONSE_ENUM; data?: TAmountDetail } | undefined> => {
    return await api
        .get(`transactions/amount-detail/${userId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        .then((response: AxiosResponse<TAmountDetail, any>) => {
            if (response.status === 200) {
                return { status: API_RESPONSE_ENUM.SUCCESS, data: response.data }
            }
        })
        .catch((error) => {
            return {
                status: API_RESPONSE_ENUM.ERROR,
            }
        })
}

const createTransactionRequest = async (
    userId: number,
    access_token: string | null,
    values: TTransaction
): Promise<{ status: API_RESPONSE_ENUM } | undefined> => {
    return await api
        .post(
            'transactions/create',
            {
                ...values,
                transactionDate: new Date(values.transactionDate).toISOString(),
                transactionValue:
                    values.transactionType === 'Saida'
                        ? values.transactionValue * -1
                        : values.transactionValue,
                userId: userId,
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        )
        .then((response) => {
            if (response.status === 200) {
                return { status: API_RESPONSE_ENUM.SUCCESS }
            }
        })
        .catch((error) => {
            return { status: API_RESPONSE_ENUM.ERROR }
        })
}

const deleteTransactionRequest = async (
    id: number,
    userId: number,
    access_token: string | null
): Promise<{ status: API_RESPONSE_ENUM } | undefined> => {
    return await api
        .delete(`transactions/delete/id/${id}/user/${userId}/`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        .then((response) => {
            if (response.status === 200) {
                return { status: API_RESPONSE_ENUM.SUCCESS }
            }
        })
}

export {
    getTransactionsRequest,
    getTransactionsAmountRequest,
    createTransactionRequest,
    deleteTransactionRequest,
}
