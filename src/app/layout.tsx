import type { Metadata } from 'next'
import './globals.css'

import { Toaster } from 'sonner'
import Header from '@/app/components/Header/Header'

export const metadata: Metadata = {
    title: 'Finance Controller',
    icons: '/money.png',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className="bg-neutral-800">
                <Toaster position="top-right" />
                <Header />
                {children}
            </body>
        </html>
    )
}
