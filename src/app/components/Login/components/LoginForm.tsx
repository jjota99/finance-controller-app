import { ReactElement, useMemo } from 'react'
import GenericForm from '@/app/components/Form/Form'
import { FormTypeEnum } from '@/app/components/Login/Login'
import { compareByOrder } from '@/app/utils/CompareByOrder'

type TUserFormInput = {
    label: string
    placeholder: string
    name: string
    maxLength?: number
    variant?: string
    order: number
}

type Props = {
    formType: FormTypeEnum
}

export default function LoginForm({ formType }: Props): ReactElement {
    const initialValues = {
        name: '',
        cpf: '',
        password: '',
        passwordConfirm: '',
    }
    const onSubmit = (data: any) => console.log(data)

    const formInputsDecider = useMemo(() => {
        const formInputs: TUserFormInput[] = [
            {
                label: 'CPF',
                placeholder: 'Digite seu CPF',
                name: 'cpf',
                maxLength: 11,
                order: 1,
            },
            {
                label: 'Senha',
                placeholder: 'Digite sua senha',
                name: 'password',
                variant: 'password',
                order: 2,
            },
            {
                label: 'Confirmação de senha',
                placeholder: 'Digite a confirmação de sua senha',
                name: 'passwordConfirm',
                variant: 'password',
                order: 3,
            },
            {
                label: 'Nome',
                placeholder: 'Digite seu nome',
                name: 'name',
                order: 0,
            },
        ]

        if (formType === FormTypeEnum.LOGIN) {
            return formInputs.slice(0, 2)
        }

        return formInputs.sort(compareByOrder)
    }, [formType])

    return (
        <GenericForm
            formInputs={formInputsDecider}
            initialValues={initialValues}
            onSubmit={onSubmit}
        />
    )
}
