import { Dispatch, ReactElement, SetStateAction } from 'react'
import GenericForm from '@/app/components/Form/Form'
import { TFormInput } from '@/app/types/form'
import { FormProvider, useForm } from 'react-hook-form'
import { TTransactions } from '@/app/types/mainDashboard'
import { X } from '@phosphor-icons/react'

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function NewTransaction({ setOpen }: Props): ReactElement {
    const methods = useForm<TTransactions>()

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
            rules: {
                required: { value: true, message: 'Campo obrigatório' },
            },
            order: 3,
        },
    ]

    const onSubmit = (values: any) =>
        console.log({
            ...values,
            transactionDate: new Date(values.transactionDate).toISOString(),
        })
    const onReset = () =>
        methods.reset({
            transactionName: '',
            transactionDate: '',
            transactionType: '',
            transactionValue: '',
        })

    return (
        <div className="w-full h-full flex flex-1 flex-col gap-y-8">
            <div className="flex w-full justify-between align-middle">
                <span className="text-neutral-200 text-xl font-semibold">
                    Nova transação
                </span>

                <X
                    weight="bold"
                    height={20}
                    width={20}
                    className="text-neutral-200 cursor-pointer"
                    onClick={() => setOpen(false)}
                />
            </div>

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
