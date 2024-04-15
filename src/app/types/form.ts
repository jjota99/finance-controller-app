import { ValidationRule } from 'react-hook-form'
import { ReactNode } from 'react'

export type TFormInput = {
    name: string
    label: string
    size?: 'lg' | 'sm' | 'md'
    type: 'input' | 'dropdown' | 'date'
    onResetField?: () => void
    options?: {
        label: string
        value: string
    }[]
    variant?: 'number' | 'text' | 'password' | 'date'
    rules: {
        required: {
            value: boolean
            message: string
        }
        maxLength?: {
            value?: ValidationRule<number> | number
            message?: string
        }
    }
    placeholder: string
    order: number
}
