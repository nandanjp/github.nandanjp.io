'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark'

function getResolved(): Theme {
    if (typeof document === 'undefined') return 'light'
    // Read what the inline THEME_INIT_SCRIPT already applied to <html>
    return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light'
}

function apply(theme: Theme) {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.setAttribute('data-theme', theme)
    root.style.colorScheme = theme
    window.localStorage.setItem('theme', theme)
}

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const [theme, setTheme] = useState<Theme>('light')
    const [fillDark, setFillDark] = useState(false)
    const fillControls = useAnimationControls()

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(getResolved())
        setMounted(true)
    }, [])

    function toggle() {
        const next: Theme = theme === 'dark' ? 'light' : 'dark'
        setFillDark(next === 'dark')
        setTheme(next)
        apply(next)
        // Reset to collapsed then sweep — only on explicit click, never on mount
        fillControls.set({ clipPath: 'circle(0% at 100% 0%)' })
        fillControls.start({
            clipPath: 'circle(150% at 100% 0%)',
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        })
    }

    const isDark = theme === 'dark'

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggle}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="relative overflow-hidden"
        >
            <motion.span
                className={cn(
                    'pointer-events-none absolute inset-0 rounded-[inherit]',
                    fillDark ? 'bg-zinc-900' : 'bg-amber-50'
                )}
                initial={{ clipPath: 'circle(0% at 100% 0%)' }}
                animate={fillControls}
            />

            <AnimatePresence mode="wait" initial={false}>
                {!mounted ? (
                    <span key="placeholder" className="size-4" />
                ) : isDark ? (
                    <motion.span
                        key="moon"
                        className="relative z-10"
                        initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Moon className="size-4 text-indigo-300" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="sun"
                        className="relative z-10"
                        initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -45, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Sun className="size-4 text-amber-600" />
                    </motion.span>
                )}
            </AnimatePresence>
        </Button>
    )
}
