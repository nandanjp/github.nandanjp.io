import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { SITE } from '@/content/site'

const WORK_ENTRIES = SITE.work.entries
const PROJECT_ENTRIES = SITE.work.projects

type Accent = 'sky' | 'violet'

const ACCENT = {
    sky: {
        label:  'text-sky-500 dark:text-sky-400',
        line:   'border-sky-400/35 dark:border-sky-500/30',
        border: 'border-sky-300/50 dark:border-sky-700/40',
        bg:     'bg-sky-50/30 dark:bg-sky-950/20',
        arrow:  'text-sky-400/70 dark:text-sky-500/60',
        date:   'text-sky-500/50 dark:text-sky-400/40 border-sky-300/30 dark:border-sky-600/30',
    },
    violet: {
        label:  'text-violet-500 dark:text-violet-400',
        line:   'border-violet-400/35 dark:border-violet-500/30',
        border: 'border-violet-300/50 dark:border-violet-700/40',
        bg:     'bg-violet-50/30 dark:bg-violet-950/20',
        arrow:  'text-violet-400/70 dark:text-violet-500/60',
        date:   'text-violet-500/50 dark:text-violet-400/40 border-violet-300/30 dark:border-violet-600/30',
    },
} as const

function SectionDivider({ label, accent }: { label: string; accent: Accent }) {
    const a = ACCENT[accent]
    return (
        <div className="flex items-center gap-4 my-10">
            <div className={`flex-1 border-t-2 border-dashed ${a.line}`} />
            <span className={`font-hand font-bold text-2xl select-none ${a.label}`}>
                {label}
            </span>
            <div className={`flex-1 border-t-2 border-dashed ${a.line}`} />
        </div>
    )
}

function BulletSkeletons({ count, accent }: { count: number; accent: Accent }) {
    const a = ACCENT[accent]
    return (
        <div className="flex flex-col gap-2.5 mt-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-2.5">
                    <span className={`font-hand text-base shrink-0 select-none ${a.arrow}`}>
                        ↳
                    </span>
                    <Skeleton
                        className="h-3 animate-none opacity-20"
                        style={{ width: `${72 - i * 8}%` }}
                    />
                </div>
            ))}
        </div>
    )
}

type WorkEntry = typeof WORK_ENTRIES[number]
type ProjectEntry = typeof PROJECT_ENTRIES[number]

function WorkEntryCard({ entry, index }: { entry: WorkEntry; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotate: `${entry.rotate}deg` }}
            whileHover={{ rotate: 0, y: -3, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
            className={`rounded-xl border-2 border-dashed ${ACCENT.sky.border} ${ACCENT.sky.bg} px-3 py-4 sm:px-5 sm:py-5 mb-4 cursor-default`}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="font-hand font-bold text-xl sm:text-2xl leading-tight text-foreground">
                        {entry.company}
                    </p>
                    <p className="font-hand text-sm sm:text-base text-muted-foreground mt-0.5">
                        {entry.role}
                    </p>
                </div>
                <span className={`font-mono text-xs tabular-nums shrink-0 mt-1.5 border border-dashed rounded px-2 py-0.5 ${ACCENT.sky.date}`}>
                    {entry.period}
                </span>
            </div>
            <BulletSkeletons count={3} accent="sky" />
        </motion.div>
    )
}

function ProjectEntryCard({ entry, index }: { entry: ProjectEntry; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotate: `${entry.rotate}deg` }}
            whileHover={{ rotate: 0, y: -3, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
            className={`rounded-xl border-2 border-dashed ${ACCENT.violet.border} ${ACCENT.violet.bg} px-3 py-4 sm:px-5 sm:py-5 mb-4 cursor-default`}
        >
            <p className="font-hand font-bold text-xl sm:text-2xl leading-tight text-foreground">
                {entry.name}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1 tracking-wider">
                {entry.tech}
            </p>
            <BulletSkeletons count={3} accent="violet" />
        </motion.div>
    )
}

export function WorkPage() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <div ref={ref} className="rounded-2xl border border-dashed border-foreground/20 overflow-hidden bg-card/30 shadow-sm">
            {/* Mac chrome */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-dashed border-foreground/15 bg-muted/20">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-400/70" />
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                    {SITE.work.filename}
                </span>
            </div>

            {/* Document content with dot grid */}
            <div className="relative">
                {/* Dot grid */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
                    <defs>
                        <filter id="resume-rough" x="-10%" y="-10%" width="120%" height="120%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" seed="7" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                        <pattern id="resume-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" className="fill-foreground" opacity="0.07" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#resume-dots)" />
                </svg>

                <div className="relative z-10 px-5 sm:px-10 pt-7 pb-10">
                    {/* Name + bio header */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-2"
                    >
                        <h1 className="font-hand font-bold text-6xl sm:text-7xl tracking-tight leading-none bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
                            {SITE.work.resumeName}
                        </h1>
                        <p className="font-hand text-xl text-muted-foreground mt-2">
                            {SITE.work.resumeBio}
                        </p>
                    </motion.div>

                    {/* Work Experience */}
                    <SectionDivider label={SITE.work.experienceLabel} accent="sky" />
                    {WORK_ENTRIES.map((entry, i) => (
                        <WorkEntryCard key={entry.company} entry={entry} index={i} />
                    ))}

                    {/* Projects */}
                    <SectionDivider label={SITE.work.projectsLabel} accent="violet" />
                    {PROJECT_ENTRIES.map((entry, i) => (
                        <ProjectEntryCard key={entry.name} entry={entry} index={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}
