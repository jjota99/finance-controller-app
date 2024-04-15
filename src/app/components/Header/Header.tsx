import Image from 'next/image'
import type { ReactElement } from 'react'

export default function Header(): ReactElement {
    return (
        <header className="flex justify-center w-full items-center bg-neutral-900 py-4">
            <div className="flex items-center gap-x-4">
                <Image src="/money.png" width={30} height={30} alt="logo" />
                <h1 className="text-neutral-200 text-2xl">Contolador de finanças</h1>
            </div>
        </header>
    )
}
