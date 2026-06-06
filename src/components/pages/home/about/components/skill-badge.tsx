import { Badge } from '@/components/ui/badge'

interface SkillBadgeProps {
    name: string
}

export function SkillBadge({ name }: SkillBadgeProps) {
    return (
        <Badge variant="secondary" className="px-3 py-1 font-mono text-xs">
            {name}
        </Badge>
    )
}
