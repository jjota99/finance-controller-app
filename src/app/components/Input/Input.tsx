import type { ReactElement } from 'react'
import React from 'react'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import clsx from 'clsx'

type Props = {
    label: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'text' | 'password' | 'number' | 'date'
    placeholder: string
    maxLength?: number
    initialValue?: string | number
}

export default function Input({
    label,
    size = 'md',
    variant = 'text',
    placeholder,
    maxLength,
    initialValue = '',
    ...rest
}: Props): ReactElement {
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    return (
        <div className="flex flex-col flex-1 gap-1">
            <span className="text-neutral-200">{label}</span>
            <div
                className={clsx(
                    'flex items-center justify-between',
                    'bg-white',
                    PADDING_MAP[size],
                    'rounded',
                    'border border-neutral-400',
                    'text-base'
                )}
            >
                <input
                    lang="pt-BR"
                    maxLength={maxLength}
                    value={initialValue}
                    placeholder={placeholder}
                    type={showPassword ? 'text' : variant}
                    className={clsx(
                        variant === 'date' && 'text-neutral-500',
                        'flex-1',
                        'border-none',
                        'shadow-none',
                        'outline-none',
                        'focus:outline-none'
                    )}
                    {...rest}
                />

                {variant === 'password' && (
                    <>
                        {showPassword ? (
                            <Eye
                                role={'button'}
                                onClick={() =>
                                    setShowPassword((showPassword) => !showPassword)
                                }
                                className={'cursor-pointer text-neutral-900'}
                            />
                        ) : (
                            <EyeSlash
                                role="button"
                                onClick={() =>
                                    setShowPassword((showPassword) => !showPassword)
                                }
                                className={'cursor-pointer text-neutral-900'}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

const PADDING_MAP = {
    sm: 'py-[1px] px-2',
    md: 'py-1 px-4',
    lg: 'py-2 px-4',
}
