import { ReactElement, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { CaretDown, CaretUp } from '@phosphor-icons/react'

type Props = {
    placeholder: string
    label: string
    name: string
    fieldValue?: string
    options: { label: string; value: string }[]
    size?: 'sm' | 'md' | 'lg'
}

export default function Dropdown({
    placeholder,
    label,
    name,
    fieldValue,
    options,
    size = 'lg',
}: Props): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { setValue } = useFormContext()

    const placeholderMemo = useMemo(() => {
        if (!fieldValue) {
            return placeholder
        }
        return fieldValue
    }, [fieldValue])

    return (
        <div className="w-full flex flex-col gap-1">
            <span className="text-neutral-200">{label}</span>

            <div className="flex flex-col gap-1">
                <div
                    role="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={clsx(
                        'bg-white rounded w-full flex justify-between items-center',
                        PADDING_MAP[size]
                    )}
                >
                    <span
                        className={clsx(
                            fieldValue ? 'text-neutral-900' : 'text-neutral-400'
                        )}
                    >
                        {placeholderMemo}
                    </span>

                    {isOpen ? <CaretUp /> : <CaretDown />}
                </div>

                {isOpen && (
                    <div className="flex flex-col bg-white w-full rounded">
                        {options.map((option) => (
                            <div
                                role="button"
                                onClick={() => {
                                    setIsOpen(false)
                                    setValue(name, option.value)
                                }}
                                key={option.value}
                                className="w-full h-full hover:bg-neutral-100 py-1 px-2 cursor-pointer rounded"
                            >
                                <span>{option.label}</span>
                            </div>
                        ))}
                    </div>
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
