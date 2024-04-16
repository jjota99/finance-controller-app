import { Dispatch, ReactElement, SetStateAction, useCallback } from 'react'
import GenericForm from '@/app/components/Form/Form'
import { TFormInput } from '@/app/types/form'
import { FormProvider, useForm } from 'react-hook-form'
import { TAmountDetail, TTransaction, TTransactions } from '@/app/types/mainDashboard'
import { api, API_RESPONSE_ENUM } from '@/app/api/api'
import { AxiosResponse } from 'axios'
import { useAuthStore } from '@/app/stores/auth'
import { createTransactionRequest } from '@/app/api/services/MainDashboard'
import { toast } from 'sonner'

type Props = {
    handleFetchTransactions: () => void
    setTransactions: Dispatch<SetStateAction<TTransactions | undefined>>
    setAmountDetail: Dispatch<SetStateAction<TAmountDetail | undefined>>
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function NewTransaction({
    handleFetchTransactions,
    setOpen,
}: Props): ReactElement {
    const methods = useForm<TTransaction>()

    const { getTokenInLocalStorage, user } = useAuthStore()
    const access_token = getTokenInLocalStorage()

    const formInputs: TFormInput[] = [
        {
            label: 'Nome',
            placeholder: 'Digite o nome da transação',
            name: 'transactionName',
            type: 'input',
            rules: {
                required: { value: true, message: 'Campo obrigatório' },
            },
            order: 0,
        },
        {
            label: 'Data',
            placeholder: 'Digite a data da transação',
            name: 'transactionDate',
            type: 'date',
            variant: 'date',
            rules: {
                required: { value: true, message: 'Campo obrigatório' },
            },
            order: 1,
        },
        {
            label: 'Tipo',
            placeholder: 'Selecione o tipo de transação',
            name: 'transactionType',
            type: 'dropdown',
            options: [
                {
                    value: 'Entrada',
                    label: 'Entrada',
                },
                {
                    value: 'Saida',
                    label: 'Saida',
                },
            ],
            rules: {
                required: { value: true, message: 'Campo obrigatório' },
            },
            order: 2,
        },
        {
            label: 'Valor',
            placeholder: 'Digite o valor da transação',
            name: 'transactionValue',
            type: 'input',
            variant: 'number',
            rules: {
                required: { value: true, message: 'Campo obrigatório' },
            },
            order: 3,
        },
    ]

    const onSubmit = useCallback(
        async (values: TTransaction) => {
            if (user.id && values) {
                const createTransactionReq = await createTransactionRequest(
                    user.id,
                    access_token,
                    values
                )

                if (createTransactionReq?.status === API_RESPONSE_ENUM.SUCCESS) {
                    onReset()
                    setOpen(false)
                    handleFetchTransactions()

                    toast.success('Transação criada com sucesso!', {
                        className: 'bg-green-700 text-neutral-200',
                    })

                    return
                }

                toast.error(createTransactionReq?.message, {
                    className: 'bg-red-700 text-neutral-200',
                })
            }
        },
        [user]
    )

    const onReset = () =>
        methods.reset({
            transactionName: '',
            transactionDate: '',
            transactionType: '',
            transactionValue: undefined,
        })

    return (
        <div className="w-full h-full flex flex-1 flex-col gap-y-8">
            <FormProvider {...methods}>
                <GenericForm
                    formInputs={formInputs}
                    onSubmit={methods.handleSubmit(onSubmit)}
                    onReset={onReset}
                    control={methods.control}
                />
            </FormProvider>
        </div>
    )
}
