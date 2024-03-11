import Image from 'next/image'
import Link from 'next/link'
import type { ReactElement } from 'react'

export default function Footer(): ReactElement {
    return (
        <div className="flex justify-center align-middle bg-neutral-900 w-full p-2 absolute bottom-0 gap-x-1">
            <span className="text-neutral-200">João G. Pandolfo</span>
            <Link href="https://www.linkedin.com/in/jo%C3%A3o-guilherme-pandolfo-a7a3b9219/">
                <Image src="/linkedin.svg" alt="linkedinSvg" width={25} height={25} />
            </Link>
        </div>
    )
}
