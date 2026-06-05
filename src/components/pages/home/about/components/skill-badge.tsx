import { Badge } from '@/components/ui/badge'

interface SkillBadgeProps {
    name: string
}

export function SkillBadge({ name }: SkillBadgeProps) {
    return (
        <Badge variant="secondary" className="text-xs font-mono px-3 py-1">
            {name}
        </Badge>
    )
}
