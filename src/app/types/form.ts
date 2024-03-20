import { ValidationRule } from 'react-hook-form'

export type TFormInput = {
    name: string
    label: string
    size?: 'lg' | 'sm' | 'md'
    variant?: 'number' | 'text' | 'password'
    maxLength?: ValidationRule<number>
    placeholder: string
    order: number
}
