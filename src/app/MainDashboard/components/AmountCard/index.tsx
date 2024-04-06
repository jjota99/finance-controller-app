import { TAmountCard } from '@/app/types/mainDashboard'
import clsx from 'clsx'

type Props = TAmountCard

export default function AmountCard({ title, value, status }: Props) {
    return (
        <div className="bg-neutral-900 p-4 flex-1 flex flex-col justify-between rounded w-full min-h-[150px]">
            <span className="text-neutral-200 text-lg font-semibold">{title}</span>

            <span
                className={clsx(
                    'text-3xl',
                    'text-center',
                    'font-bold',
                    status === 'positive' ? 'text-green-500' : 'text-red-500'
                )}
            >
                {status === 'negative' && '-'} R${' '}
                {value?.substring(status === 'positive' ? 1 : 2) || '0.00'}
            </span>
        </div>
    )
}
