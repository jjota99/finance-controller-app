import { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'

type Props = {
    content: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function Dialog({ content, open, setOpen }: Props): ReactElement {
    return (
        <RadixDialog.Root open={open} onOpenChange={setOpen}>
            <RadixDialog.Portal>
                <RadixDialog.Content className="fixed bottom-0 left-0 z-50 h-full w-full backdrop-brightness-50 flex justify-center">
                    <div className="border-1 flex max-h-full flex-col justify-between rounded border-neutral-300 bg-neutral-900 shadow-xl sm:m-24 sm:max-h-[566px] p-4 w-[600px]">
                        {content}
                    </div>
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    )
}
