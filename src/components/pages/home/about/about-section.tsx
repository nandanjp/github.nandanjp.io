import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    siTypescript,
    siGo,
    siRust,
    siPython,
    siHaskell,
    siNextdotjs,
    siApachekafka,
    siPostgresql,
    siKubernetes,
    siRedis,
    siDocker,
} from 'simple-icons'
import { TechBadge } from './components/tech-badge'

const LANGUAGES = [
    {
        name: 'TypeScript',
        iconPath: siTypescript.path,
        colors: {
            bg:     'bg-blue-100/80   dark:bg-blue-950/40',
            border: 'border-blue-200/70 dark:border-blue-800/40',
            text:   'text-blue-700    dark:text-blue-300',
            icon:   'text-blue-600    dark:text-blue-400',
        },
    },
    {
        name: 'Go',
        iconPath: siGo.path,
        colors: {
            bg:     'bg-cyan-100/80   dark:bg-cyan-950/40',
            border: 'border-cyan-200/70 dark:border-cyan-800/40',
            text:   'text-cyan-700    dark:text-cyan-300',
            icon:   'text-cyan-600    dark:text-cyan-400',
        },
    },
    {
        name: 'Rust',
        iconPath: siRust.path,
        colors: {
            bg:     'bg-orange-100/80   dark:bg-orange-950/40',
            border: 'border-orange-200/70 dark:border-orange-800/40',
            text:   'text-orange-700    dark:text-orange-300',
            icon:   'text-orange-600    dark:text-orange-400',
        },
    },
    {
        name: 'Python',
        iconPath: siPython.path,
        colors: {
            bg:     'bg-yellow-100/80   dark:bg-yellow-950/40',
            border: 'border-yellow-200/70 dark:border-yellow-800/40',
            text:   'text-yellow-700    dark:text-yellow-300',
            icon:   'text-yellow-600    dark:text-yellow-400',
        },
    },
    {
        name: 'Haskell',
        iconPath: siHaskell.path,
        colors: {
            bg:     'bg-purple-100/80   dark:bg-purple-950/40',
            border: 'border-purple-200/70 dark:border-purple-800/40',
            text:   'text-purple-700    dark:text-purple-300',
            icon:   'text-purple-600    dark:text-purple-400',
        },
    },
] as const

const TOOLS = [
    {
        name: 'Next.js',
        iconPath: siNextdotjs.path,
        colors: {
            bg:     'bg-zinc-100/80   dark:bg-zinc-800/40',
            border: 'border-zinc-200/70 dark:border-zinc-700/40',
            text:   'text-zinc-700    dark:text-zinc-300',
            icon:   'text-zinc-600    dark:text-zinc-400',
        },
    },
    {
        name: 'Kafka',
        iconPath: siApachekafka.path,
        colors: {
            bg:     'bg-emerald-100/80   dark:bg-emerald-950/40',
            border: 'border-emerald-200/70 dark:border-emerald-800/40',
            text:   'text-emerald-700    dark:text-emerald-300',
            icon:   'text-emerald-600    dark:text-emerald-400',
        },
    },
    {
        name: 'PostgreSQL',
        iconPath: siPostgresql.path,
        colors: {
            bg:     'bg-sky-100/80   dark:bg-sky-950/40',
            border: 'border-sky-200/70 dark:border-sky-800/40',
            text:   'text-sky-700    dark:text-sky-300',
            icon:   'text-sky-600    dark:text-sky-400',
        },
    },
    {
        name: 'Kubernetes',
        iconPath: siKubernetes.path,
        colors: {
            bg:     'bg-indigo-100/80   dark:bg-indigo-950/40',
            border: 'border-indigo-200/70 dark:border-indigo-800/40',
            text:   'text-indigo-700    dark:text-indigo-300',
            icon:   'text-indigo-600    dark:text-indigo-400',
        },
    },
    {
        name: 'Redis',
        iconPath: siRedis.path,
        colors: {
            bg:     'bg-rose-100/80   dark:bg-rose-950/40',
            border: 'border-rose-200/70 dark:border-rose-800/40',
            text:   'text-rose-700    dark:text-rose-300',
            icon:   'text-rose-600    dark:text-rose-400',
        },
    },
    {
        name: 'Docker',
        iconPath: siDocker.path,
        colors: {
            bg:     'bg-teal-100/80   dark:bg-teal-950/40',
            border: 'border-teal-200/70 dark:border-teal-800/40',
            text:   'text-teal-700    dark:text-teal-300',
            icon:   'text-teal-600    dark:text-teal-400',
        },
    },
] as const

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }
}

export function AboutSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} className="py-20 lg:py-28 border-t">
            <motion.div
                variants={container}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            >
                {/* Bio */}
                <motion.div variants={item} className="flex flex-col gap-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">
                        [02] — about
                    </p>
                    <h2 className="font-hand font-bold text-4xl sm:text-5xl tracking-tight leading-[1.1]">
                        Systems thinker,<br />frontend builder.
                    </h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed text-base sm:text-lg">
                        <p>
                            I build backend infrastructure and developer tools by day,
                            and explore web graphics and UI engineering by night.
                            Currently deep in Kubernetes, distributed systems, and
                            making things go really fast.
                        </p>
                        <p>
                            When I&apos;m not writing code, I&apos;m playing guitar,
                            watching anime, or hunting for the best bowl of ramen in the city.
                        </p>
                    </div>
                </motion.div>

                {/* Stack */}
                <motion.div variants={item} className="flex flex-col gap-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">
                        tech stack
                    </p>

                    <div className="flex flex-col gap-5">
                        <div>
                            <p className="font-mono text-xs text-muted-foreground/60 mb-3">
                                Languages
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {LANGUAGES.map(lang => (
                                    <TechBadge key={lang.name} {...lang} />
                                ))}
                            </div>
                        </div>

                        <div className="border-t pt-5">
                            <p className="font-mono text-xs text-muted-foreground/60 mb-3">
                                Tools
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {TOOLS.map(tool => (
                                    <TechBadge key={tool.name} {...tool} />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
