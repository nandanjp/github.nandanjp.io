import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { SITE } from '@/content/site'

const WORK_ENTRIES = SITE.work.entries
const PROJECT_ENTRIES = SITE.work.projects

type Accent = 'sky' | 'violet'

const ACCENT = {
    sky: {
        label: 'text-sky-500 dark:text-sky-400',
        line: 'border-sky-400/35 dark:border-sky-500/30',
        border: 'border-sky-300/50 dark:border-sky-700/40',
        bg: 'bg-sky-50/30 dark:bg-sky-950/20',
        arrow: 'text-sky-400/70 dark:text-sky-500/60',
        date: 'text-sky-500/50 dark:text-sky-400/40 border-sky-300/30 dark:border-sky-600/30'
    },
    violet: {
        label: 'text-violet-500 dark:text-violet-400',
        line: 'border-violet-400/35 dark:border-violet-500/30',
        border: 'border-violet-300/50 dark:border-violet-700/40',
        bg: 'bg-violet-50/30 dark:bg-violet-950/20',
        arrow: 'text-violet-400/70 dark:text-violet-500/60',
        date: 'text-violet-500/50 dark:text-violet-400/40 border-violet-300/30 dark:border-violet-600/30'
    }
} as const

function SectionDivider({ label, accent }: { label: string; accent: Accent }) {
    const a = ACCENT[accent]
    return (
        <div className="my-10 flex items-center gap-4">
            <div className={`flex-1 border-t-2 border-dashed ${a.line}`} />
            <span
                className={`font-hand text-2xl font-bold select-none ${a.label}`}
            >
                {label}
            </span>
            <div className={`flex-1 border-t-2 border-dashed ${a.line}`} />
        </div>
    )
}

function EntryBullets({
    bullets,
    accent
}: {
    bullets: readonly string[]
    accent: Accent
}) {
    const a = ACCENT[accent]
    return (
        <div className="mt-3 flex flex-col gap-2">
            {bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5">
                    <span
                        className={`font-hand mt-px shrink-0 text-base select-none ${a.arrow}`}
                    >
                        ↳
                    </span>
                    <p className="font-hand text-muted-foreground text-sm leading-snug sm:text-base">
                        {b}
                    </p>
                </div>
            ))}
        </div>
    )
}

type WorkEntry = (typeof WORK_ENTRIES)[number]
type ProjectEntry = (typeof PROJECT_ENTRIES)[number]

function WorkEntryCard({ entry, index }: { entry: WorkEntry; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
            }}
            style={{ rotate: `${entry.rotate}deg` }}
            whileHover={{
                rotate: 0,
                y: -3,
                transition: { type: 'spring', stiffness: 280, damping: 22 }
            }}
            className={`rounded-xl border-2 border-dashed ${ACCENT.sky.border} ${ACCENT.sky.bg} mb-4 cursor-default px-3 py-4 sm:px-5 sm:py-5`}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="font-hand text-foreground text-xl leading-tight font-bold sm:text-2xl">
                        {entry.company}
                    </p>
                    <p className="font-hand text-muted-foreground mt-0.5 text-sm sm:text-base">
                        {entry.role}
                    </p>
                </div>
                <span
                    className={`mt-1.5 shrink-0 rounded border border-dashed px-2 py-0.5 font-mono text-xs tabular-nums ${ACCENT.sky.date}`}
                >
                    {entry.period}
                </span>
            </div>
            <EntryBullets bullets={entry.bullets} accent="sky" />
        </motion.div>
    )
}

function ProjectEntryCard({
    entry,
    index
}: {
    entry: ProjectEntry
    index: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
            }}
            style={{ rotate: `${entry.rotate}deg` }}
            whileHover={{
                rotate: 0,
                y: -3,
                transition: { type: 'spring', stiffness: 280, damping: 22 }
            }}
            className={`rounded-xl border-2 border-dashed ${ACCENT.violet.border} ${ACCENT.violet.bg} mb-4 cursor-default px-3 py-4 sm:px-5 sm:py-5`}
        >
            <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="font-hand text-foreground group/link inline-flex items-center gap-1.5 text-xl leading-tight font-bold transition-colors hover:text-violet-500 sm:text-2xl dark:hover:text-violet-400"
            >
                {entry.name}
                <ExternalLink className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover/link:opacity-60" />
            </a>
            <p className="text-muted-foreground mt-1 font-mono text-xs tracking-wider">
                {entry.tech}
            </p>
            <EntryBullets bullets={entry.bullets} accent="violet" />
        </motion.div>
    )
}

export function WorkPage() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <div
            ref={ref}
            className="border-foreground/20 bg-card/30 overflow-hidden rounded-2xl border border-dashed shadow-sm"
        >
            {/* Mac chrome */}
            <div className="border-foreground/15 bg-muted/20 flex items-center gap-1.5 border-b border-dashed px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-400/70" />
                <span className="text-muted-foreground ml-auto font-mono text-xs">
                    {SITE.work.filename}
                </span>
            </div>

            {/* Document content with dot grid */}
            <div className="relative">
                {/* Dot grid */}
                <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    aria-hidden
                >
                    <defs>
                        <filter
                            id="resume-rough"
                            x="-10%"
                            y="-10%"
                            width="120%"
                            height="120%"
                        >
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.045"
                                numOctaves="4"
                                seed="7"
                                result="noise"
                            />
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="noise"
                                scale="1.4"
                                xChannelSelector="R"
                                yChannelSelector="G"
                            />
                        </filter>
                        <pattern
                            id="resume-dots"
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
                    <rect width="100%" height="100%" fill="url(#resume-dots)" />
                </svg>

                <div className="relative z-10 px-5 pt-7 pb-10 sm:px-10">
                    {/* Name + bio header */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-2"
                    >
                        <h1 className="font-hand bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-6xl leading-none font-bold tracking-tight text-transparent sm:text-7xl">
                            {SITE.work.resumeName}
                        </h1>
                        <p className="font-hand text-muted-foreground mt-2 text-xl">
                            {SITE.work.resumeBio}
                        </p>
                    </motion.div>

                    {/* Work Experience */}
                    <SectionDivider
                        label={SITE.work.experienceLabel}
                        accent="sky"
                    />
                    {WORK_ENTRIES.map((entry, i) => (
                        <WorkEntryCard
                            key={entry.company}
                            entry={entry}
                            index={i}
                        />
                    ))}

                    {/* Projects */}
                    <SectionDivider
                        label={SITE.work.projectsLabel}
                        accent="violet"
                    />
                    {PROJECT_ENTRIES.map((entry, i) => (
                        <ProjectEntryCard
                            key={entry.name}
                            entry={entry}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
