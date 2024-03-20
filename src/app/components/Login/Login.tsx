'use client'

import { type ReactElement, useState } from 'react'
import LoginForm from '@/app/components/Login/components/LoginForm'

export enum FormTypeEnum {
    REGISTER = 'register',
    LOGIN = 'login',
}

export default function Login(): ReactElement {
    const [formType, setFormType] = useState<FormTypeEnum>(FormTypeEnum.LOGIN)

    return (
        <main className="flex flex-1 items-center justify-center">
            <div className="fixed inset-y-36 bg-neutral-900 p-8 flex flex-col justify-between items-center w-1/4 min-h-[650px] rounded">
                <h1 className="text-2xl text-neutral-200">Login</h1>

                <LoginForm formType={formType} />

                <span
                    className="text-base text-neutral-200 underline cursor-pointer hover:text-neutral-400"
                    role="button"
                    onClick={() =>
                        setFormType(
                            formType === FormTypeEnum.LOGIN
                                ? FormTypeEnum.REGISTER
                                : FormTypeEnum.LOGIN
                        )
                    }
                >
                    {formType === FormTypeEnum.LOGIN
                        ? 'Cadastre-se'
                        : '< Voltar para login'}
                </span>
            </div>
        </main>
    )
}
