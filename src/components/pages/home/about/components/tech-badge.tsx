import { cn } from '@/lib/utils'

interface TechBadgeProps {
    name: string
    iconPath: string
    colors: {
        bg: string
        text: string
        border: string
        icon: string
    }
}

export function TechBadge({ name, iconPath, colors }: TechBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-opacity hover:opacity-80',
                colors.bg,
                colors.border,
            )}
        >
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={cn('size-3.5 shrink-0', colors.icon)}
                aria-hidden="true"
            >
                <path d={iconPath} />
            </svg>
            <span className={colors.text}>{name}</span>
        </span>
    )
}
