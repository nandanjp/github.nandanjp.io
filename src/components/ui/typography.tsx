import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

// Decorative section numbering (e.g. "[01] — hero"). Visual only — hidden from screen readers
// since the <h2>/<h1> sibling already names the section.
export function SectionLabel({ className, ...props }: ComponentPropsWithoutRef<'p'>) {
    return (
        <p
            aria-hidden="true"
            className={cn(
                'text-muted-foreground font-mono text-xs tracking-[0.22em] uppercase',
                className
            )}
            {...props}
        />
    )
}

// Secondary label inside cards or subsections — carries meaning, not hidden.
export function SubLabel({ className, ...props }: ComponentPropsWithoutRef<'p'>) {
    return (
        <p
            className={cn(
                'text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase',
                className
            )}
            {...props}
        />
    )
}

// Primary page title (h1) used on route-level pages.
export function PageHeading({ className, ...props }: ComponentPropsWithoutRef<'h1'>) {
    return (
        <h1
            className={cn(
                'font-hand text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl',
                className
            )}
            {...props}
        />
    )
}

// Section heading (h2) used within home-page and content sections.
export function SectionHeading({ className, ...props }: ComponentPropsWithoutRef<'h2'>) {
    return (
        <h2
            className={cn(
                'font-hand text-4xl font-bold tracking-tight sm:text-5xl',
                className
            )}
            {...props}
        />
    )
}
