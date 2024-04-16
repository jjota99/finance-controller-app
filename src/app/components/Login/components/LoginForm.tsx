import { Dispatch, ReactElement, SetStateAction, useEffect, useMemo } from 'react'
import GenericForm from '@/app/components/Form/Form'
import { FormTypeEnum } from '@/app/components/Login/Login'
import { compareByOrder } from '@/app/utils/CompareByOrder'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TLoginForm } from '@/app/types/login'
import { TFormInput } from '@/app/types/form'
import { API_RESPONSE_ENUM } from '@/app/api/api'
import { toast } from 'sonner'
import { useAuthStore } from '@/app/stores/auth'
import { useRouter } from 'next/navigation'
import { createAccountRequest, loginRequest } from '@/app/api/services/login'

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
            const createAccountReq = await createAccountRequest(data)

            if (createAccountReq?.status === API_RESPONSE_ENUM.SUCCESS) {
                toast.error('Conta criada com sucesso!', {
                    className: 'bg-green-700 text-neutral-200',
                })
                onReset()
                setFormType(FormTypeEnum.LOGIN)

                return
            }

            toast.error(createAccountReq?.message, {
                className: 'bg-green-700 text-neutral-200',
            })
        }

        const loginReq = await loginRequest(data, access_token)

        if (loginReq?.status === API_RESPONSE_ENUM.SUCCESS) {
            saveTokenInLocalStorage(loginReq?.data)
            router.push('/MainDashboard')
            toast.success('Login efetuado com sucesso!', {
                className: 'bg-green-700 text-neutral-200',
            })
            return
        }

        toast.error(loginReq?.message, {
            className: 'bg-red-700 text-neutral-200',
        })
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
            type: 'input',
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
            type: 'input',
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
            type: 'input',
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
            type: 'input',
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
