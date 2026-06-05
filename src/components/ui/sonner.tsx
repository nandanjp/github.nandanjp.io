import { useEffect, useState } from 'react'
import { Toaster as Sonner } from 'sonner'
import {
    CircleCheckIcon,
    InfoIcon,
    Loader2Icon,
    OctagonXIcon,
    TriangleAlertIcon
} from 'lucide-react'
import type { ToasterProps } from 'sonner'

function useResolvedTheme(): 'light' | 'dark' {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    useEffect(() => {
        const root = document.documentElement
        const read = () => setTheme(root.classList.contains('dark') ? 'dark' : 'light')
        read()
        const observer = new MutationObserver(read)
        observer.observe(root, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])
    return theme
}

const Toaster = ({ ...props }: ToasterProps) => {
    const theme = useResolvedTheme()

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            icons={{
                success: <CircleCheckIcon className="size-4" />,
                info: <InfoIcon className="size-4" />,
                warning: <TriangleAlertIcon className="size-4" />,
                error: <OctagonXIcon className="size-4" />,
                loading: <Loader2Icon className="size-4 animate-spin" />
            }}
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                    '--border-radius': 'var(--radius)'
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast: 'cn-toast'
                }
            }}
            {...props}
        />
    )
}

export { Toaster }
