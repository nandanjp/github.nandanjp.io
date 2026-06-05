import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
    badge?: string
    title: string
    subtitle?: string
    className?: string
    children?: React.ReactNode
}

export function PageHeader({
    badge,
    title,
    subtitle,
    className,
    children
}: PageHeaderProps) {
    return (
        <section
            className={cn(
                'flex flex-col items-center gap-4 mx-auto px-6 py-16 lg:py-24 w-full text-center container',
                className
            )}
        >
            {badge && <Badge variant="secondary">{badge}</Badge>}
            <h1 className="max-w-3xl font-bold text-3xl sm:text-5xl tracking-tight">
                {title}
            </h1>
            {subtitle && (
                <p className="max-w-xl text-muted-foreground text-base sm:text-lg">
                    {subtitle}
                </p>
            )}
            {children}
        </section>
    )
}
