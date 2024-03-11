import Image from 'next/image'
import type { ReactElement } from 'react'
export default function Header(): ReactElement {
    return (
        <header className="flex flex-1 justify-center align-middle bg-neutral-900 p-4 gap-4">
            <Image src="/money.png" width={30} height={30} alt="logo" />
            <h1 className="text-neutral-200 text-2xl">Finance controller</h1>
        </header>
    )
}
