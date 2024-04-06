export type TMeResponse = {
    id: number | null
    name: string | null
    cpf: string | null
}

export type TAmountDetail = {
    income: { value: string; status: string }
    outcome: { value: string; status: string }
    total: { value: string; status: string }
}

export type TAmountCard = {
    title: string
    value?: string
    status?: string
}
