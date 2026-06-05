import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { GhibliIcon } from '@/components/icons/ghibli'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
    { path: '/blog',     label: 'Blog' },
    { path: '/projects', label: 'Projects' },
    { path: '/photos',   label: 'Photos' },
    { path: '/music',    label: 'Music' },
    { path: '/work',     label: 'Work' },
] as const

export function MobileNav() {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [open])

    return (
        <>
            {/* Hamburger */}
            <button
                onClick={() => setOpen(v => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md hover:bg-accent/60 transition-colors"
            >
                <span className={cn(
                    'block h-px w-5 bg-foreground transition-all duration-300 origin-center',
                    open && 'translate-y-[6px] rotate-45',
                )} />
                <span className={cn(
                    'block h-px w-5 bg-foreground transition-all duration-300',
                    open && 'opacity-0 scale-x-0',
                )} />
                <span className={cn(
                    'block h-px w-5 bg-foreground transition-all duration-300 origin-center',
                    open && '-translate-y-[6px] -rotate-45',
                )} />
            </button>

            {mounted && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            key="mobile-menu"
                            variants={{
                                hidden: { opacity: 0, x: '100%', transition: { duration: 0.28, delay: 0.14, ease: [0.4, 0, 0.6, 1] } },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="fixed inset-0 z-[60] flex flex-col bg-background"
                        >
                            {/* Header — mirrors the navbar exactly */}
                            <div className="flex h-14 items-center justify-between border-b border-foreground/8 px-4 sm:px-6">
                                <Link
                                    to="/"
                                    onClick={() => setOpen(false)}
                                    className="flex size-9 items-center justify-center rounded-[22%] bg-sky-400 hover:bg-sky-500 transition-colors"
                                >
                                    <GhibliIcon className="size-6" />
                                </Link>
                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label="Close menu"
                                    className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md hover:bg-accent/60 transition-colors"
                                >
                                    <span className="block h-px w-5 bg-foreground translate-y-[6px] rotate-45 origin-center" />
                                    <span className="block h-px w-5 bg-foreground opacity-0" />
                                    <span className="block h-px w-5 bg-foreground -translate-y-[6px] -rotate-45 origin-center" />
                                </button>
                            </div>

                            {/* Nav links */}
                            <nav className="flex flex-1 flex-col items-center justify-center gap-1">
                                {NAV_LINKS.map((link, i) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.28, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setOpen(false)}
                                            className="group flex flex-col items-center py-2"
                                            activeProps={{ className: 'is-active' }}
                                        >
                                            <span className="font-mono text-[10px] text-muted-foreground/40 tabular-nums mb-0.5">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <span className="font-hand font-bold text-5xl tracking-tight transition-colors duration-200 group-hover:text-primary group-[.is-active]:text-primary">
                                                {link.label}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Footer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.32 }}
                                className="flex items-center justify-between border-t border-foreground/8 px-8 py-6"
                            >
                                <div className="flex flex-col gap-1">
                                    <a
                                        href="https://github.com/nandanjp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        github.com/nandanjp
                                    </a>
                                    <a
                                        href="mailto:nandan.jp17@gmail.com"
                                        className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        nandan.jp17@gmail.com
                                    </a>
                                </div>
                                <span className="font-mono text-xs text-muted-foreground/40">
                                    © {new Date().getFullYear()}
                                </span>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body,
            )}
        </>
    )
}
