import { MonoText } from '@/components/ui/typography'
import { LANGUAGE_COLORS } from './language-colors'

interface LanguageBarProps {
    name: string
    count: number
    total: number
}

export function LanguageBar({ name, count, total }: LanguageBarProps) {
    const pct = Math.round((count / total) * 100)
    const color = LANGUAGE_COLORS[name] ?? '#8b949e'

    return (
        <div className="flex items-center gap-3">
            <MonoText className="w-24 shrink-0 truncate">{name}</MonoText>
            <div className="bg-muted/50 h-2 flex-1 overflow-hidden rounded-full">
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                />
            </div>
            <MonoText className="w-9 shrink-0 text-right opacity-60">{pct}%</MonoText>
        </div>
    )
}
