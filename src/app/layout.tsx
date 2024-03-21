import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import { Toaster } from 'sonner'

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
                <Footer />
            </body>
        </html>
    )
}
