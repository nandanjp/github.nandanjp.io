'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@/components/Icon'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/button'
import { MonoText } from '@/components/ui/typography'
import { SITE } from '@/content/site'
import { cn } from '@/lib/utils'

function isActivePath(linkPath: string, pathname: string): boolean {
    return linkPath === '/' ? pathname === '/' : pathname.startsWith(linkPath)
}

function MobileNav() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    useEffect(() => {
        function handleKey(event: KeyboardEvent) {
            if (event.key === 'Escape') setOpen(false)
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [open])

    // Close on route change (handles back/forward navigation where onClick doesn't fire)
    useEffect(() => {
        setOpen(false) // eslint-disable-line react-hooks/set-state-in-effect
    }, [pathname])

    return (
        <>
            <Button
                variant="ghost"
                size="icon-lg"
                onClick={() => setOpen(prev => !prev)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="relative flex-col gap-[5px]"
            >
                <span className={cn('bg-foreground block h-px w-5 origin-center transition-all duration-300', open && 'translate-y-[6px] rotate-45')} />
                <span className={cn('bg-foreground block h-px w-5 transition-all duration-300', open && 'scale-x-0 opacity-0')} />
                <span className={cn('bg-foreground block h-px w-5 origin-center transition-all duration-300', open && '-translate-y-[6px] -rotate-45')} />
            </Button>

            {mounted && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            key="mobile-menu"
                            variants={{
                                hidden: { opacity: 0, x: '100%', transition: { duration: 0.28, delay: 0.14, ease: [0.4, 0, 0.6, 1] } },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="bg-background fixed inset-0 z-[60] flex flex-col"
                        >
                            {/* Header mirrors the navbar */}
                            <div className="border-foreground/8 flex h-14 items-center justify-between border-b px-4 sm:px-6">
                                <Link
                                    href="/"
                                    aria-label="Home"
                                    onClick={() => setOpen(false)}
                                    className="flex size-9 items-center justify-center rounded-[22%] bg-sky-400 transition-colors hover:bg-sky-500"
                                >
                                    <Icon.Ghibli className="size-6" />
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon-lg"
                                    onClick={() => setOpen(false)}
                                    aria-label="Close menu"
                                    className="flex-col gap-[5px]"
                                >
                                    <span className="bg-foreground block h-px w-5 origin-center translate-y-[6px] rotate-45" />
                                    <span className="bg-foreground block h-px w-5 opacity-0" />
                                    <span className="bg-foreground block h-px w-5 origin-center -translate-y-[6px] -rotate-45" />
                                </Button>
                            </div>

                            {/* Nav links */}
                            <nav className="flex flex-1 flex-col items-center justify-center gap-1">
                                {SITE.nav.links.map((link, linkIndex) => {
                                    const active = isActivePath(link.path, pathname)
                                    return (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.28,
                                                delay: 0.08 + linkIndex * 0.06,
                                                ease: [0.22, 1, 0.36, 1]
                                            }}
                                        >
                                            <Link
                                                href={link.path}
                                                onClick={() => setOpen(false)}
                                                className="group flex flex-col items-center py-2"
                                            >
                                                <MonoText className="mb-0.5 tabular-nums">
                                                    {String(linkIndex + 1).padStart(2, '0')}
                                                </MonoText>
                                                <span className={cn(
                                                    'font-hand text-5xl font-bold tracking-tight transition-colors duration-200',
                                                    active ? 'text-primary' : 'group-hover:text-primary'
                                                )}>
                                                    {link.label}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </nav>

                            {/* Footer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.32 }}
                                className="border-foreground/8 flex items-center justify-between border-t px-8 py-6"
                            >
                                <div className="flex flex-col gap-1">
                                    <a
                                        href={SITE.identity.githubUrl ?? '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                                    >
                                        github.com/{SITE.identity.github}
                                    </a>
                                    <a
                                        href={`mailto:${SITE.identity.email}`}
                                        className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                                    >
                                        {SITE.identity.email}
                                    </a>
                                </div>
                                <MonoText>© {new Date().getFullYear()}</MonoText>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}

export function Navbar() {
    const pathname = usePathname()

    return (
        <header className="bg-background/80 border-foreground/8 sticky inset-0 z-50 border-b backdrop-blur-2xl">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
                <Link
                    href="/"
                    aria-label="Home"
                    className="flex size-9 shrink-0 items-center justify-center rounded-[22%] bg-sky-400 transition-colors hover:bg-sky-500"
                >
                    <Icon.Ghibli className="size-6" />
                </Link>

                <nav className="hidden flex-1 items-center gap-1 md:flex">
                    {SITE.nav.links.map(link => {
                        const active = isActivePath(link.path, pathname)
                        return (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={cn(
                                    'relative rounded-md px-3 py-1.5',
                                    'font-hand text-lg font-bold',
                                    'hover:bg-accent/40 transition-colors',
                                    'after:absolute after:right-3 after:bottom-0.5 after:left-3 after:h-px',
                                    'after:bg-foreground/50 after:origin-left after:transition-transform',
                                    active
                                        ? 'text-foreground after:scale-x-100'
                                        : 'text-muted-foreground/70 hover:text-foreground after:scale-x-0'
                                )}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <div className="md:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    )
}
