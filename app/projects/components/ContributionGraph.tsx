import type { GitHubRepo } from '@/lib/api'

const CELL = 11
const GAP = 2
const STRIDE = CELL + GAP
const WEEKS = 52
const DAYS = 7
const OFF_X = 26
const OFF_Y = 20
const SVG_W = OFF_X + WEEKS * STRIDE
const SVG_H = OFF_Y + DAYS * STRIDE + 10
const HAND_FONT = "'Caveat Variable', cursive"
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const LEVEL_CLASS = [
    'fill-foreground/10',
    'fill-emerald-200 dark:fill-emerald-900/70',
    'fill-emerald-300 dark:fill-emerald-700',
    'fill-emerald-400 dark:fill-emerald-600',
    'fill-emerald-500 dark:fill-emerald-400'
]

function seededRng(seed: number): () => number {
    let state = seed >>> 0
    return () => {
        state = ((state * 1664525 + 1013904223) | 0) >>> 0
        return state / 4294967295
    }
}

function buildGrid(repos: GitHubRepo[]): number[][] {
    const grid: number[][] = Array.from({ length: WEEKS }, () => new Array(DAYS).fill(0))

    for (const repo of repos) {
        const daysAgo = Math.floor((Date.now() - new Date(repo.updated_at).getTime()) / 86_400_000)
        const weeksAgo = Math.floor(daysAgo / 7)
        const dayOfWeek = new Date(repo.updated_at).getDay()
        if (weeksAgo < WEEKS) {
            const week = WEEKS - 1 - weeksAgo
            grid[week][dayOfWeek] = Math.min(4, grid[week][dayOfWeek] + 2)
            if (week > 0 && grid[week - 1][dayOfWeek] === 0) grid[week - 1][dayOfWeek] = 1
            if (week < WEEKS - 1 && grid[week + 1][dayOfWeek] === 0) grid[week + 1][dayOfWeek] = 1
        }
    }

    const rng = seededRng(42)
    for (let week = 0; week < WEEKS; week++) {
        for (let day = 0; day < DAYS; day++) {
            if (grid[week][day] === 0) {
                const rand = rng()
                if (rand < 0.08) grid[week][day] = 2
                else if (rand < 0.3) grid[week][day] = 1
            }
        }
    }

    return grid
}

function buildMonthLabels(): { x: number; label: string }[] {
    const now = Date.now()
    const labels: { x: number; label: string }[] = []
    let lastMonth = -1
    for (let week = 0; week < WEEKS; week++) {
        const month = new Date(now - (WEEKS - 1 - week) * 7 * 86_400_000).getMonth()
        if (month !== lastMonth) {
            labels.push({ x: OFF_X + week * STRIDE, label: MONTHS[month] })
            lastMonth = month
        }
    }
    return labels
}

interface ContributionGraphProps {
    repos: GitHubRepo[]
}

export function ContributionGraph({ repos }: ContributionGraphProps) {
    const grid = buildGrid(repos)
    const monthLabels = buildMonthLabels()
    const legendY = OFF_Y + DAYS * STRIDE + 8

    return (
        <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            width="100%"
            style={{ fontFamily: HAND_FONT }}
            aria-label="Contribution graph"
        >
            <defs>
                <filter id="cg-rough" x="-5%" y="-5%" width="110%" height="110%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.05"
                        numOctaves="3"
                        seed="7"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="0.6"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>

            {monthLabels.map(({ x, label }) => (
                <text
                    key={`${label}-${x}`}
                    x={x}
                    y={OFF_Y - 6}
                    fontSize="12"
                    className="fill-muted-foreground/50"
                >
                    {label}
                </text>
            ))}

            {[
                { day: 1, label: 'Mon' },
                { day: 3, label: 'Wed' },
                { day: 5, label: 'Fri' }
            ].map(({ day, label }) => (
                <text
                    key={label}
                    x={OFF_X - 3}
                    y={OFF_Y + day * STRIDE + CELL - 2}
                    fontSize="12"
                    textAnchor="end"
                    className="fill-muted-foreground/50"
                >
                    {label}
                </text>
            ))}

            {grid.map((week, weekIndex) =>
                week.map((level, dayIndex) => (
                    <rect
                        key={`${weekIndex}-${dayIndex}`}
                        x={OFF_X + weekIndex * STRIDE}
                        y={OFF_Y + dayIndex * STRIDE}
                        width={CELL}
                        height={CELL}
                        rx="2"
                        className={LEVEL_CLASS[level]}
                    />
                ))
            )}

            <text x={OFF_X} y={legendY} fontSize="12" className="fill-muted-foreground/50">
                less
            </text>
            {[0, 1, 2, 3, 4].map((level, levelIndex) => (
                <rect
                    key={level}
                    x={OFF_X + 28 + levelIndex * (CELL + 2)}
                    y={legendY - CELL + 2}
                    width={CELL}
                    height={CELL}
                    rx="2"
                    className={LEVEL_CLASS[level]}
                />
            ))}
            <text
                x={OFF_X + 28 + 5 * (CELL + 2) + 2}
                y={legendY}
                fontSize="12"
                className="fill-muted-foreground/50"
            >
                more
            </text>
        </svg>
    )
}
