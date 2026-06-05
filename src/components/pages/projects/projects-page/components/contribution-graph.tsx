import { useMemo } from 'react'
import type { GitHubRepo } from '@/lib/api'

const CELL = 11
const GAP = 2
const STRIDE = CELL + GAP // 13
const WEEKS = 52
const DAYS = 7
const OFF_X = 26
const OFF_Y = 20
const SVG_W = OFF_X + WEEKS * STRIDE  // 702
const SVG_H = OFF_Y + DAYS * STRIDE + 10  // 121
const HAND_FONT = "'Caveat Variable', cursive"
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const LEVEL_CLASS = [
    'fill-foreground/10',
    'fill-emerald-200 dark:fill-emerald-900/70',
    'fill-emerald-300 dark:fill-emerald-700',
    'fill-emerald-400 dark:fill-emerald-600',
    'fill-emerald-500 dark:fill-emerald-400',
]

function seededRng(seed: number): () => number {
    let s = seed >>> 0
    return () => {
        s = ((s * 1664525 + 1013904223) | 0) >>> 0
        return s / 4294967295
    }
}

interface ContributionGraphProps {
    repos: GitHubRepo[]
}

export function ContributionGraph({ repos }: ContributionGraphProps) {
    const grid = useMemo(() => {
        // WEEKS × DAYS grid initialised to 0
        const g: number[][] = Array.from({ length: WEEKS }, () => new Array(DAYS).fill(0))

        // Mark cells based on repo activity
        for (const repo of repos) {
            const updatedMs = new Date(repo.updated_at).getTime()
            const daysAgo = Math.floor((Date.now() - updatedMs) / 86400000)
            const weeksAgo = Math.floor(daysAgo / 7)
            const dow = new Date(repo.updated_at).getDay()
            if (weeksAgo < WEEKS) {
                const w = WEEKS - 1 - weeksAgo
                g[w][dow] = Math.min(4, g[w][dow] + 2)
                // Adjacent weeks get level 1
                if (w > 0 && g[w - 1][dow] === 0) g[w - 1][dow] = 1
                if (w < WEEKS - 1 && g[w + 1][dow] === 0) g[w + 1][dow] = 1
            }
        }

        // Fill empty cells with seeded PRNG
        const rng = seededRng(42)
        for (let w = 0; w < WEEKS; w++) {
            for (let d = 0; d < DAYS; d++) {
                if (g[w][d] === 0) {
                    const r = rng()
                    if (r < 0.08) {
                        g[w][d] = 2
                    } else if (r < 0.30) {
                        g[w][d] = 1
                    }
                }
            }
        }

        return g
    }, [repos])

    const monthLabels = useMemo(() => {
        const now = Date.now()
        const labels: { x: number; label: string }[] = []
        let lastMonth = -1
        for (let w = 0; w < WEEKS; w++) {
            const date = new Date(now - (WEEKS - 1 - w) * 7 * 86400000)
            const month = date.getMonth()
            if (month !== lastMonth) {
                labels.push({ x: OFF_X + w * STRIDE, label: MONTHS[month] })
                lastMonth = month
            }
        }
        return labels
    }, [])

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

            {/* Month labels */}
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

            {/* Day labels: Mon=1, Wed=3, Fri=5 */}
            {[{ d: 1, label: 'Mon' }, { d: 3, label: 'Wed' }, { d: 5, label: 'Fri' }].map(({ d, label }) => (
                <text
                    key={label}
                    x={OFF_X - 3}
                    y={OFF_Y + d * STRIDE + CELL - 2}
                    fontSize="12"
                    textAnchor="end"
                    className="fill-muted-foreground/50"
                >
                    {label}
                </text>
            ))}

            {/* Grid cells */}
            {grid.map((week, w) =>
                week.map((level, d) => (
                    <rect
                        key={`${w}-${d}`}
                        x={OFF_X + w * STRIDE}
                        y={OFF_Y + d * STRIDE}
                        width={CELL}
                        height={CELL}
                        rx="2"
                        className={LEVEL_CLASS[level]}
                    />
                ))
            )}

            {/* Legend */}
            <text
                x={OFF_X}
                y={legendY}
                fontSize="12"
                className="fill-muted-foreground/50"
                fontFamily="'JetBrains Mono Variable', monospace"
            >
                less
            </text>
            {[0, 1, 2, 3, 4].map((lvl, i) => (
                <rect
                    key={lvl}
                    x={OFF_X + 28 + i * (CELL + 2)}
                    y={legendY - CELL + 2}
                    width={CELL}
                    height={CELL}
                    rx="2"
                    className={LEVEL_CLASS[lvl]}
                />
            ))}
            <text
                x={OFF_X + 28 + 5 * (CELL + 2) + 2}
                y={legendY}
                fontSize="12"
                className="fill-muted-foreground/50"
                fontFamily="'JetBrains Mono Variable', monospace"
            >
                more
            </text>
        </svg>
    )
}
