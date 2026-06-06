import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

// Decorative section numbering e.g. "[01] — intro". Visual only — hidden from
// screen readers since the heading sibling already names the section.
export function SectionLabel({
    className,
    ...props
}: ComponentPropsWithoutRef<'p'>) {
    return (
        <p
            aria-hidden="true"
            className={cn(
                'text-muted-foreground font-mono text-xs tracking-widest uppercase',
                className
            )}
            {...props}
        />
    )
}

// Secondary label inside cards or subsections — carries meaning, not hidden.
export function SubLabel({
    className,
    ...props
}: ComponentPropsWithoutRef<'p'>) {
    return (
        <p
            className={cn(
                'text-muted-foreground font-mono text-xs tracking-widest uppercase',
                className
            )}
            {...props}
        />
    )
}

// Primary page title (h1) used at the route level.
export function PageHeading({
    className,
    ...props
}: ComponentPropsWithoutRef<'h1'>) {
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

// Section heading (h2) for home-page sections and content sections.
export function SectionHeading({
    className,
    ...props
}: ComponentPropsWithoutRef<'h2'>) {
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

// Card-level heading (h2) for blog cards, music cards, repo cards, etc.
// Override size via className when a smaller variant is needed (e.g. text-xl).
export function CardHeading({
    className,
    ...props
}: ComponentPropsWithoutRef<'h2'>) {
    return (
        <h2
            className={cn(
                'font-hand text-2xl leading-tight font-bold sm:text-3xl',
                className
            )}
            {...props}
        />
    )
}

// Body paragraph — muted, responsive size. Used for page descriptions and
// section body copy.
export function BodyText({
    className,
    ...props
}: ComponentPropsWithoutRef<'p'>) {
    return (
        <p
            className={cn(
                'text-muted-foreground text-sm sm:text-base',
                className
            )}
            {...props}
        />
    )
}

// Inline monospace metadata: dates, counts, filenames, durations. Defaults to
// a span so it composes naturally inside other text elements.
export function MonoText({
    className,
    ...props
}: ComponentPropsWithoutRef<'span'>) {
    return (
        <span
            className={cn('text-muted-foreground font-mono text-xs', className)}
            {...props}
        />
    )
}

// Empty-state heading — short string like "No photos yet".
export function EmptyHeading({
    className,
    ...props
}: ComponentPropsWithoutRef<'p'>) {
    return <p className={cn('text-lg font-medium', className)} {...props} />
}

// Empty-state body — short string like "Check back soon."
export function EmptyBody({
    className,
    ...props
}: ComponentPropsWithoutRef<'p'>) {
    return (
        <p
            className={cn('text-muted-foreground text-sm', className)}
            {...props}
        />
    )
}
