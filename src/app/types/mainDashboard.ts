export type TMeResponse = {
    id: number | null
    name: string | null
    cpf: string | null
}

export type TAmountDetail = {
    income: number
    outcome: number
    total: number
}

export type TAmountCard = {
    title: string
    value?: number
    type: 'income' | 'outcome' | 'total'
}
