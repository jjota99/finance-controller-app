import { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer(): ReactElement {
    return (
        <div className="w-full py-2 bg-neutral-900 flex justify-center items-center absolute bottom-0">
            <div className="flex items-center gap-x-2 h-full">
                <span className="text-neutral-200">João G. Pandolfo (Jota)</span>
                <Link href="https://www.linkedin.com/in/jo%C3%A3o-guilherme-pandolfo-a7a3b9219/">
                    <Image src="/linkedin.svg" alt="linkedinSvg" width={30} height={30} />
                </Link>

                <Link href="https://github.com/jjota99">
                    <Image src="/github.png" alt="linkedinSvg" width={22} height={22} />
                </Link>
            </div>
        </div>
    )
}
