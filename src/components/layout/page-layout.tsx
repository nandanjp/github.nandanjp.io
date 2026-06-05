import type { ReactNode } from 'react'
import { Navbar } from '@/components/pages/home/navbar'
import { Footer } from '@/components/layout/footer'

interface PageLayoutProps {
    children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-col flex-1">{children}</main>
            <Footer />
        </div>
    )
}
