import {
    HeadContent,
    Link,
    Outlet,
    Scripts,
    createRootRoute
} from '@tanstack/react-router'
import appCSS from '../styles.css?url'

import TanStackQueryProvider from '@/integrations/tanstack-query/root-provider'
import { buttonVariants } from '@/components/ui/button'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            { title: 'Nandan Patel' },
            {
                name: 'description',
                content:
                    'Software engineer building fast systems, elegant UIs, and open-source tools.'
            },
            { name: 'theme-color', content: '#38bdf8' }
        ],
        links: [
            { rel: 'stylesheet', href: appCSS },
            { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png'
            },
            { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
            { rel: 'manifest', href: '/manifest.json' }
        ]
    }),
    component: RootComponent,
    notFoundComponent: NotFoundPage,
    shellComponent: RootDocument
})

function RootComponent() {
    return <Outlet />
}

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
            <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                404
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
                Page not found
            </h1>
            <p className="text-muted-foreground">
                The page you're looking for doesn't exist.
            </p>
            <Link to="/" className={buttonVariants({ variant: 'outline' })}>
                Go home
            </Link>
        </div>
    )
}

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
                />
                <HeadContent />
            </head>
            <body className="font-sans wrap-anywhere antialiased selection:bg-[rgba(79,184,178,0.24)]">
                <TanStackQueryProvider>{children}</TanStackQueryProvider>
                <Scripts />
            </body>
        </html>
    )
}
