import Input from '@/app/components/Input/Input'
import { FormType } from '@/app/components/Login/Login'
import Button from '@/app/components/Button/Button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import type { ReactElement } from 'react'

type TFormInput = {
    name?: string
    cpf?: string
    password?: string
    passwordConfirm?: string
}

type Props = {
    formType: FormType
}

export default function LoginForm({ formType }: Props): ReactElement {
    const formInitialValues: TFormInput = {
        name: '',
        cpf: '',
        password: '',
        passwordConfirm: '',
    }

    const { control, handleSubmit, reset } = useForm<TFormInput>({
        defaultValues: formInitialValues,
    })
    const onSubmit: SubmitHandler<TFormInput> = (data) => console.log(data)

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 w-full justify-center"
        >
            {formType === FormType.REGISTER && (
                <Controller
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => (
                        <Input
                            label="Nome"
                            size="lg"
                            placeholder="Digite seu nome"
                            {...field}
                        />
                    )}
                    name="name"
                    control={control}
                />
            )}
            <Controller
                rules={{
                    required: true,
                    maxLength: 11,
                }}
                render={({ field }) => (
                    <Input
                        label="CPF"
                        size="lg"
                        placeholder="Digite seu CPF"
                        {...field}
                    />
                )}
                name="cpf"
                control={control}
            />
            <Controller
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <Input
                        label="Senha"
                        size="lg"
                        variant="password"
                        placeholder="Digite sua senha"
                        {...field}
                    />
                )}
                name="password"
                control={control}
            />
            {formType === FormType.REGISTER && (
                <Controller
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => (
                        <Input
                            label="Confirmação de senha"
                            size="lg"
                            variant="password"
                            placeholder="Confirme sua senha"
                            {...field}
                        />
                    )}
                    name="passwordConfirm"
                    control={control}
                />
            )}
            <Button title="Confirmar" type="submit" variant="primary" size="lg" />
            <Button
                title="Limpar"
                size="lg"
                variant="secondary"
                type="reset"
                onClick={() => reset(formInitialValues)}
            />
        </form>
    )
}
