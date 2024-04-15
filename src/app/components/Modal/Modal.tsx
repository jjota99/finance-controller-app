import { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react'
import { X } from '@phosphor-icons/react'

type Props = {
    title: string
    content: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function Modal({ title, content, open, setOpen }: Props): ReactElement {
    return (
        <>
            {open && (
                <div className=" absolute w-max left-[34.4%] top-[25%] bg-green-200 backdrop">
                    <div className="bg-neutral-900 fixed z-50 w-[600px] h-[540px] p-4 rounded border-neutral-800 shadow-xl border-2">
                        <div className="flex w-full justify-between align-middle">
                            <span className="text-neutral-200 text-xl font-semibold">
                                {title}
                            </span>

                            <X
                                weight="bold"
                                height={20}
                                width={20}
                                className="text-neutral-200 cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        </div>

                        {content}
                    </div>
                </div>
            )}
        </>
    )
}
