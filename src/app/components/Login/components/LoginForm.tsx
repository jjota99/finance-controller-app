import { Dispatch, ReactElement, SetStateAction, useEffect, useMemo } from 'react'
import GenericForm from '@/app/components/Form/Form'
import { FormTypeEnum } from '@/app/components/Login/Login'
import { compareByOrder } from '@/app/utils/CompareByOrder'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TLoginForm } from '@/app/types/login'
import { TFormInput } from '@/app/types/form'
import { api } from '@/app/api/api'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'
import { useAuthStore } from '@/app/stores/auth'
import { useRouter } from 'next/navigation'

type Props = {
    formType: FormTypeEnum
    setFormType: Dispatch<SetStateAction<FormTypeEnum>>
}

export default function LoginForm({ formType, setFormType }: Props): ReactElement {
    const { saveTokenInLocalStorage, getTokenInLocalStorage } = useAuthStore()
    const access_token = getTokenInLocalStorage()
    const router = useRouter()

    const { handleSubmit, reset, control } = useForm<TLoginForm, Partial<TLoginForm>>()
    const onSubmit: SubmitHandler<TLoginForm> = async (data: TLoginForm) => {
        if (formType === FormTypeEnum.REGISTER) {
            await api
                .post('/users', data)
                .then((response: AxiosResponse<void, TLoginForm>) => {
                    toast.success('Conta criada com sucesso!', {
                        className: 'bg-green-700 text-neutral-200',
                    })
                    onReset()
                    setFormType(FormTypeEnum.LOGIN)
                })
                .catch((error) =>
                    toast.error(error.response.data.error, {
                        className: 'bg-red-700 text-neutral-200',
                    })
                )

            return
        }

        await api
            .post('/auth/sign-in', data, {
                headers: { Authorization: `Bearer: ${access_token}` },
            })
            .then((response: AxiosResponse<{ access_token: string }, TLoginForm>) => {
                if (response.status === 200) {
                    saveTokenInLocalStorage(response?.data?.access_token)
                    router.push('/MainDashboard')
                }
            })
            .catch((error) =>
                toast.error(error.response.data.error, {
                    className: 'bg-red-700 text-neutral-200',
                })
            )
    }
    const onReset = () =>
        reset({
            name: '',
            cpf: '',
            password: '',
            passwordConfirm: '',
        })

    const formInputs: TFormInput[] = [
        {
            label: 'CPF',
            placeholder: 'Digite seu CPF',
            name: 'cpf',
            rules: {
                required: { value: true, message: 'Campo obrigatório' },
                maxLength: { value: 11, message: 'Obrigatório ter 11 digitos!' },
            },
            order: 1,
        },
        {
            label: 'Senha',
            placeholder: 'Digite sua senha',
            name: 'password',
            rules: {
                required: { value: true, message: 'Campo obrigatório' },
            },
            variant: 'password',
            order: 2,
        },
        {
            label: 'Confirmação de senha',
            placeholder: 'Digite a confirmação de sua senha',
            name: 'passwordConfirm',
            rules: {
                required: { value: true, message: 'Campo obrigatório' },
            },
            variant: 'password',
            order: 3,
        },
        {
            label: 'Nome',
            placeholder: 'Digite seu nome',
            name: 'name',
            rules: {
                required: { value: true, message: 'Campo obrigatório' },
            },
            order: 0,
        },
    ]

    const formInputsDecider = useMemo(() => {
        if (formType === FormTypeEnum.LOGIN) {
            return formInputs.slice(0, 2)
        }

        return formInputs.sort(compareByOrder)
    }, [formType])

    useEffect(() => onReset, [formType])

    return (
        <GenericForm
            formInputs={formInputsDecider}
            onSubmit={handleSubmit(onSubmit)}
            onReset={onReset}
            control={control}
        />
    )
}
