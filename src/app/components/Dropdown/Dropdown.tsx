import { ReactElement, useMemo, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../radix-ui/Dropdown'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import clsx from 'clsx'

type Props = {
    placeholder: string
    selectedValue?: string
    size?: 'sm' | 'md' | 'lg'
    options: Array<{
        value: string
        label: string
        onClick: () => void
    }>
}

export default function Dropdown({
    placeholder,
    size = 'lg',
    selectedValue,
    options,
}: Props): ReactElement {
    const [open, setIsOpen] = useState<boolean>(false)

    const triggerLabel = useMemo(() => {
        if (selectedValue) {
            return <span className="text-neutral-900">{selectedValue}</span>
        }
        return <span className="text-neutral-400">{placeholder}</span>
    }, [placeholder, selectedValue])

    const caretDirection = useMemo(() => {
        if (open) {
            return <CaretUp className="text-neutral-500" />
        }
        return <CaretDown className="text-neutral-500" />
    }, [open])

    return (
        <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <div
                    className={clsx(
                        'bg-white w-full rounded flex justify-between items-center',
                        PADDING_MAP[size]
                    )}
                >
                    {triggerLabel}

                    {caretDirection}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options.map((option) => (
                    <DropdownMenuItem onClick={option.onClick} key={option.value}>
                        <span className="text-sm font-normal leading-6 text-slate-600">
                            {option.label}
                        </span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const PADDING_MAP = {
    sm: 'py-[1px] px-2',
    md: 'py-1 px-4',
    lg: 'py-2 px-4',
}
