import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { GhibliIcon } from '@/components/icons/ghibli'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SITE } from '@/content/site'

export function MobileNav() {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    return (
        <>
            {/* Hamburger */}
            <Button
                variant="ghost"
                size="icon-lg"
                onClick={() => setOpen(v => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="relative flex-col gap-[5px]"
            >
                <span
                    className={cn(
                        'bg-foreground block h-px w-5 origin-center transition-all duration-300',
                        open && 'translate-y-[6px] rotate-45'
                    )}
                />
                <span
                    className={cn(
                        'bg-foreground block h-px w-5 transition-all duration-300',
                        open && 'scale-x-0 opacity-0'
                    )}
                />
                <span
                    className={cn(
                        'bg-foreground block h-px w-5 origin-center transition-all duration-300',
                        open && '-translate-y-[6px] -rotate-45'
                    )}
                />
            </Button>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                key="mobile-menu"
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        x: '100%',
                                        transition: {
                                            duration: 0.28,
                                            delay: 0.14,
                                            ease: [0.4, 0, 0.6, 1]
                                        }
                                    },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            duration: 0.32,
                                            ease: [0.22, 1, 0.36, 1]
                                        }
                                    }
                                }}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="bg-background fixed inset-0 z-[60] flex flex-col"
                            >
                                {/* Header — mirrors the navbar exactly */}
                                <div className="border-foreground/8 flex h-14 items-center justify-between border-b px-4 sm:px-6">
                                    <Link
                                        to="/"
                                        aria-label="Home"
                                        onClick={() => setOpen(false)}
                                        className="flex size-9 items-center justify-center rounded-[22%] bg-sky-400 transition-colors hover:bg-sky-500"
                                    >
                                        <GhibliIcon className="size-6" />
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
                                    {SITE.nav.links.map((link, i) => (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.28,
                                                delay: 0.08 + i * 0.06,
                                                ease: [0.22, 1, 0.36, 1]
                                            }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={() => setOpen(false)}
                                                className="group flex flex-col items-center py-2"
                                                activeProps={{
                                                    className: 'is-active'
                                                }}
                                            >
                                                <span className="text-muted-foreground mb-0.5 font-mono text-xs tabular-nums">
                                                    {String(i + 1).padStart(
                                                        2,
                                                        '0'
                                                    )}
                                                </span>
                                                <span className="font-hand group-hover:text-primary group-[.is-active]:text-primary text-5xl font-bold tracking-tight transition-colors duration-200">
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
                                    className="border-foreground/8 flex items-center justify-between border-t px-8 py-6"
                                >
                                    <div className="flex flex-col gap-1">
                                        <a
                                            href={SITE.identity.githubUrl}
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
                                    <span className="text-muted-foreground font-mono text-xs">
                                        © {new Date().getFullYear()}
                                    </span>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    )
}
