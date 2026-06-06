import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { SITE } from '@/content/site'

const ENTRIES = SITE.home.interests.entries

function BlinkingCursor() {
    return (
        <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
                duration: 0.9,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear'
            }}
            className="ml-1 inline-block h-[13px] w-[7px] rounded-sm bg-emerald-500 align-middle"
        />
    )
}

type Entry = (typeof ENTRIES)[number]

function EntryOutput({ entry }: { entry: Entry }) {
    if (entry.type === 'languages') {
        return (
            <div className="flex flex-col gap-0.5 font-mono text-xs">
                {SITE.home.interests.languages.map(lang => (
                    <span key={lang.label}>
                        <span className="text-muted-foreground/60 inline-block w-16">
                            {lang.label}
                        </span>
                        <span className="text-foreground/80">{lang.level}</span>
                        {'note' in lang && (
                            <span className="text-muted-foreground ml-2 text-xs">
                                {lang.note}
                            </span>
                        )}
                    </span>
                ))}
            </div>
        )
    }

    if (entry.type === 'music') {
        return (
            <p className="text-muted-foreground/70 font-mono text-xs">
                Heavy rotation,{' '}
                <Link
                    to="/music"
                    className="transition-colors"
                    style={{ color: entry.color }}
                >
                    {SITE.home.interests.musicLink}
                </Link>
            </p>
        )
    }

    return (
        <p className="text-muted-foreground/70 font-mono text-xs">
            {entry.text}
        </p>
    )
}

function BeyondCodeTerminal({ inView }: { inView: boolean }) {
    return (
        <div className="bg-card/40 overflow-hidden rounded-xl border shadow-sm">
            {/* Mac chrome */}
            <div className="bg-muted/40 flex items-center gap-1.5 border-b px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-400/70" />
                <span className="text-muted-foreground ml-auto font-mono text-xs">
                    {SITE.home.interests.filename}
                </span>
            </div>

            {/* Content */}
            <div className="relative">
                {/* Dot grid */}
                <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    aria-hidden
                >
                    <defs>
                        <pattern
                            id="term-dots"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle
                                cx="1"
                                cy="1"
                                r="1"
                                className="fill-foreground"
                                opacity="0.07"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#term-dots)" />
                </svg>

                <div className="relative z-10 p-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                        {ENTRIES.map((entry, i) => (
                            <motion.div
                                key={entry.cmd}
                                initial={{ opacity: 0, x: -10 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    duration: 0.35,
                                    delay: 0.1 + i * 0.1,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="flex flex-col gap-1"
                            >
                                {/* Prompt line */}
                                <div className="flex items-center gap-1.5 font-mono text-sm">
                                    <span className="text-emerald-500 select-none">
                                        $
                                    </span>
                                    <span style={{ color: entry.color }}>
                                        {entry.cmd}
                                    </span>
                                </div>
                                {/* Output */}
                                <div className="border-foreground/8 border-l pl-4">
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
                        className="mt-4 flex items-center gap-1.5 font-mono text-sm"
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
        <section ref={ref} className="border-t py-14 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <p className="text-muted-foreground mb-4 font-mono text-xs tracking-[0.22em] uppercase">
                        {SITE.home.interests.label}
                    </p>
                    <h2 className="font-hand text-4xl font-bold tracking-tight sm:text-5xl">
                        {SITE.home.interests.heading
                            .split('\n')
                            .map((line, i, arr) => (
                                <span key={i}>
                                    {line}
                                    {i < arr.length - 1 && <br />}
                                </span>
                            ))}
                    </h2>
                    <p className="text-muted-foreground mt-3 max-w-lg text-sm sm:text-base">
                        {SITE.home.interests.sub}
                    </p>
                </motion.div>

                <BeyondCodeTerminal inView={inView} />
            </div>
        </section>
    )
}
