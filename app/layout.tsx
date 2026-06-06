import type { Metadata } from 'next'
import { Caveat, Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Provider from '@/components/providers/provider'

const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-hand'
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono'
})

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

// Runs synchronously before first paint to apply stored theme — prevents FOUC
const THEME_INIT_SCRIPT = `(function(){try{var s=window.localStorage.getItem('theme');var m=(s==='light'||s==='dark'||s==='auto')?s:'auto';var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=m==='auto'?(d?'dark':'light'):m;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(r);if(m!=='auto')root.setAttribute('data-theme',m);root.style.colorScheme=r;}catch(e){}})();`

export const metadata: Metadata = {
    title: 'Nandan Patel',
    description: 'Software engineer building fast systems, elegant UIs, and open-source tools.'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                'h-full',
                'antialiased',
                caveat.variable,
                geistSans.variable,
                geistMono.variable,
                jetbrainsMono.variable,
                'font-mono'
            )}
        >
            <head>
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
            </head>
            <body className="flex min-h-full flex-col">
                <Provider>
                    <Navbar />
                    <main className="flex flex-1 flex-col">{children}</main>
                    <Footer />
                </Provider>
            </body>
        </html>
    )
}
