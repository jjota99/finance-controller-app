import { TFormInput } from '@/app/types/form'

export function compareByOrder(a: TFormInput, b: TFormInput): number {
    return a.order - b.order
}
