const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    'C++': '#f34b7d',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Shell: '#89e051',
}

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
            <span className="font-mono text-xs text-muted-foreground w-24 shrink-0 truncate">
                {name}
            </span>
            <div className="h-2 flex-1 rounded-full bg-muted/50 overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                />
            </div>
            <span className="font-mono text-xs text-muted-foreground/60 w-9 shrink-0 text-right">
                {pct}%
            </span>
        </div>
    )
}
