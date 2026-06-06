import type { ReactNode } from 'react'
import { Navbar } from '@/components/pages/home/navbar'
import { Footer } from '@/components/layout/footer'

interface PageLayoutProps {
    children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
        </div>
    )
}
