import { Moon, Sun } from 'lucide-react'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type ThemeMode = 'light' | 'dark' | 'auto'

function getInitialMode(): ThemeMode {
    if (typeof window === 'undefined') {
        return 'auto'
    }

    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark' || stored === 'auto') {
        return stored
    }

    return 'auto'
}

function applyThemeMode(mode: ThemeMode) {
    const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches
    const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode

    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolved)

    if (mode === 'auto') {
        document.documentElement.removeAttribute('data-theme')
    } else {
        document.documentElement.setAttribute('data-theme', mode)
    }

    document.documentElement.style.colorScheme = resolved
}

export function ModeToggle() {
    const [mode, setMode] = useState<ThemeMode>('auto')

    useEffect(() => {
        const initialMode = getInitialMode()
        setMode(initialMode)
        applyThemeMode(initialMode)
    }, [])

    useEffect(() => {
        if (mode !== 'auto') {
            return
        }

        const media = window.matchMedia('(prefers-color-scheme: dark)')
        const onChange = () => applyThemeMode('auto')

        media.addEventListener('change', onChange)
        return () => {
            media.removeEventListener('change', onChange)
        }
    }, [mode])

    function setTheme(newMode: ThemeMode) {
        setMode(newMode)
        applyThemeMode(newMode)
        window.localStorage.setItem('theme', newMode)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="w-[1.2rem] h-[1.2rem] rotate-0 dark:-rotate-90 scale-100 dark:scale-0 transition-all" />
                    <Moon className="absolute w-[1.2rem] h-[1.2rem] rotate-90 dark:rotate-0 scale-0 dark:scale-100 transition-all" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('auto')}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
