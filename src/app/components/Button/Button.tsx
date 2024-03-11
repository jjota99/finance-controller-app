import { type ReactElement, ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
    title: string
    onClick?: (param?: any) => void
    size: 'sm' | 'md' | 'lg'
    variant: 'primary' | 'secondary'
    type?: 'button' | 'submit' | 'reset'
}
export default function Button({
    title,
    onClick,
    variant,
    size,
    type = 'button',
    ...rest
}: Props): ReactElement {
    return (
        <button
            {...rest}
            type={type}
            className={clsx(
                BG_COLORS_MAP[variant],
                PADDING_MAP[size],
                FONT_MAP[size],
                'rounded'
            )}
            onClick={onClick}
        >
            <span className={clsx(TEXT_COLORS_MAP[variant])}>{title}</span>
        </button>
    )
}

const BG_COLORS_MAP = {
    primary: 'bg-green-600',
    secondary: 'bg-white',
}

const TEXT_COLORS_MAP = {
    primary: 'text-neutral-200',
    secondary: 'text-neutral-800',
}

const PADDING_MAP = {
    sm: 'py-[1px] px-2',
    md: 'py-1 px-4',
    lg: 'py-2 px-4',
}

const FONT_MAP = {
    sm: 'text-sm',
    md: 'leading-[22px] text-sm',
    lg: 'leading-6 text-base',
}
