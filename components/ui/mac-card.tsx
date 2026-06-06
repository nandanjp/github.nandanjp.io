import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface MacWindowHeaderProps {
    title: ReactNode
    className?: string
}

export function MacWindowHeader({ title, className }: MacWindowHeaderProps) {
    return (
        <div className={cn('bg-muted/40 flex items-center gap-1.5 border-b px-4 py-2.5', className)}>
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-yellow-400/70" />
            <span className="size-2.5 rounded-full bg-green-400/70" />
            <span className="text-foreground/60 ml-auto font-mono text-xs">{title}</span>
        </div>
    )
}

interface MacCardProps {
    title: ReactNode
    children: ReactNode
    className?: string
    headerClassName?: string
}

export function MacCard({ title, children, className, headerClassName }: MacCardProps) {
    return (
        <div className={cn('overflow-hidden', className)}>
            <MacWindowHeader title={title} className={headerClassName} />
            {children}
        </div>
    )
}
