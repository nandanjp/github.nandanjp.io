import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from '@tanstack/react-router'

type Entry =
    | { cmd: string; color: string; type: 'text'; text: string }
    | { cmd: string; color: string; type: 'languages' }
    | { cmd: string; color: string; type: 'music' }

const ENTRIES: Entry[] = [
    { cmd: 'powerlifting', color: '#f87171', type: 'text', text: 'Competing in raw powerlifting. Bench · Squat · Deadlift.' },
    { cmd: 'sports',       color: '#4ade80', type: 'text', text: 'Basketball, badminton, cricket — always up for a game.' },
    { cmd: 'traveling',    color: '#60a5fa', type: 'text', text: 'New cities, new food, new perspectives. Always planning the next trip.' },
    { cmd: 'languages',    color: '#c084fc', type: 'languages' },
    { cmd: 'watching',     color: '#fbbf24', type: 'text', text: 'Anime, films, and shows. Always mid-series on something good.' },
    { cmd: 'music',        color: '#f472b6', type: 'music' },
]

function BlinkingCursor() {
    return (
        <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
            className="inline-block w-[7px] h-[13px] bg-emerald-500 ml-1 align-middle rounded-sm"
        />
    )
}

function EntryOutput({ entry }: { entry: Entry }) {
    if (entry.type === 'languages') {
        return (
            <div className="flex flex-col gap-0.5 font-mono text-xs">
                <span>
                    <span className="inline-block w-16 text-muted-foreground/60">English</span>
                    <span className="text-foreground/80">native</span>
                </span>
                <span>
                    <span className="inline-block w-16 text-muted-foreground/60">日本語</span>
                    <span className="text-foreground/80">少し</span>
                    <span className="ml-2 text-muted-foreground/40 text-[10px]">(a little)</span>
                </span>
                <span>
                    <span className="inline-block w-16 text-muted-foreground/60">中文</span>
                    <span className="text-foreground/80">一点点</span>
                    <span className="ml-2 text-muted-foreground/40 text-[10px]">(a tiny bit)</span>
                </span>
            </div>
        )
    }

    if (entry.type === 'music') {
        return (
            <p className="font-mono text-xs text-muted-foreground/70">
                Heavy rotation —{' '}
                <Link
                    to="/music"
                    className="transition-colors"
                    style={{ color: entry.color }}
                >
                    see /music →
                </Link>
            </p>
        )
    }

    return <p className="font-mono text-xs text-muted-foreground/70">{entry.text}</p>
}

function BeyondCodeTerminal({ inView }: { inView: boolean }) {
    return (
        <div className="rounded-xl border bg-card/40 overflow-hidden shadow-sm">
            {/* Mac chrome */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/40">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-400/70" />
                <span className="ml-auto font-mono text-[10px] text-muted-foreground/50">beyond-code.sh</span>
            </div>

            {/* Content */}
            <div className="relative">
                {/* Dot grid */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
                    <defs>
                        <pattern id="term-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" className="fill-foreground" opacity="0.07" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#term-dots)" />
                </svg>

                <div className="relative z-10 p-5 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        {ENTRIES.map((entry, i) => (
                            <motion.div
                                key={entry.cmd}
                                initial={{ opacity: 0, x: -10 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.35, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col gap-1"
                            >
                                {/* Prompt line */}
                                <div className="flex items-center gap-1.5 font-mono text-sm">
                                    <span className="text-emerald-500 select-none">$</span>
                                    <span style={{ color: entry.color }}>{entry.cmd}</span>
                                </div>
                                {/* Output */}
                                <div className="pl-4 border-l border-foreground/8">
                                    <EntryOutput entry={entry} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Blinking cursor */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.1 + ENTRIES.length * 0.1 + 0.2 }}
                        className="flex items-center gap-1.5 font-mono text-sm mt-4"
                    >
                        <span className="text-emerald-500 select-none">$</span>
                        <BlinkingCursor />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export function InterestsSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section ref={ref} className="py-14 lg:py-20 border-t">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50 mb-4">
                        [05] — beyond code
                    </p>
                    <h2 className="font-hand font-bold text-4xl sm:text-5xl tracking-tight">
                        Life beyond<br />the terminal.
                    </h2>
                    <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-lg">
                        Engineering is what I do — curiosity is who I am.
                    </p>
                </motion.div>

                <BeyondCodeTerminal inView={inView} />
            </div>
        </section>
    )
}
