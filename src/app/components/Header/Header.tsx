import Image from 'next/image'
import type { ReactElement } from 'react'
import Link from 'next/link'

export default function Header(): ReactElement {
    return (
        <header className="flex justify-around w-full items-center bg-neutral-900 py-4">
            <div className="flex items-center gap-x-4">
                <Image src="/money.png" width={30} height={30} alt="logo" />
                <h1 className="text-neutral-200 text-2xl">Contolador de finanças</h1>
            </div>

            <div className="flex items-center gap-x-4 h-full">
                <Link href="https://www.linkedin.com/in/jo%C3%A3o-guilherme-pandolfo-a7a3b9219/">
                    <Image src="/linkedin.svg" alt="linkedinSvg" width={30} height={30} />
                </Link>

                <Link href="https://github.com/jjota99">
                    <Image src="/github.png" alt="linkedinSvg" width={22} height={22} />
                </Link>
            </div>
        </header>
    )
}
