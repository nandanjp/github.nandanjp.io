import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    siThreedotjs,
    siWebgl,
    siBlender,
    siReact,
} from 'simple-icons'
import { ClientOnly } from '@/components/client-only'
import { PokeballScene } from './components/pokeball-scene'
import { TechBadge } from '../about/components/tech-badge'

const GRAPHICS_TOOLS = [
    {
        name: 'Three.js',
        iconPath: siThreedotjs.path,
        colors: {
            bg:     'bg-stone-100/80   dark:bg-stone-800/40',
            border: 'border-stone-200/70 dark:border-stone-700/40',
            text:   'text-stone-700    dark:text-stone-300',
            icon:   'text-stone-600    dark:text-stone-400',
        },
    },
    {
        name: 'WebGL',
        iconPath: siWebgl.path,
        colors: {
            bg:     'bg-red-100/80   dark:bg-red-950/40',
            border: 'border-red-200/70 dark:border-red-800/40',
            text:   'text-red-700    dark:text-red-300',
            icon:   'text-red-600    dark:text-red-400',
        },
    },
    {
        name: 'GLSL',
        iconPath: 'M12 2L22 22H2L12 2Z',
        colors: {
            bg:     'bg-violet-100/80   dark:bg-violet-950/40',
            border: 'border-violet-200/70 dark:border-violet-800/40',
            text:   'text-violet-700    dark:text-violet-300',
            icon:   'text-violet-600    dark:text-violet-400',
        },
    },
    {
        name: 'R3F',
        iconPath: siReact.path,
        colors: {
            bg:     'bg-cyan-100/80   dark:bg-cyan-950/40',
            border: 'border-cyan-200/70 dark:border-cyan-800/40',
            text:   'text-cyan-700    dark:text-cyan-300',
            icon:   'text-cyan-600    dark:text-cyan-400',
        },
    },
    {
        name: 'Blender',
        iconPath: siBlender.path,
        colors: {
            bg:     'bg-orange-100/80   dark:bg-orange-950/40',
            border: 'border-orange-200/70 dark:border-orange-800/40',
            text:   'text-orange-700    dark:text-orange-300',
            icon:   'text-orange-600    dark:text-orange-400',
        },
    },
] as const

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }
}

export function GraphicsSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} className="py-20 lg:py-28 border-t">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">

                {/* Canvas — top on mobile, left on desktop */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="order-first lg:order-first"
                >
                    <div className="rounded-xl border bg-card/40 overflow-hidden shadow-sm">
                        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/40">
                            <span className="size-2.5 rounded-full bg-red-400/70" />
                            <span className="size-2.5 rounded-full bg-yellow-400/70" />
                            <span className="size-2.5 rounded-full bg-green-400/70" />
                            <span className="ml-auto font-mono text-[10px] text-muted-foreground/50">
                                pokeball.glb
                            </span>
                        </div>
                        <div className="h-[260px] sm:h-[300px] md:h-auto md:aspect-square">
                            <ClientOnly>
                                <PokeballScene />
                            </ClientOnly>
                        </div>
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    variants={item}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                    className="flex flex-col gap-5"
                >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">
                        [04] — graphics & games
                    </p>
                    <h2 className="font-hand font-bold text-4xl sm:text-5xl tracking-tight leading-[1.1]">
                        Graphics, games,<br />and the GPU.
                    </h2>
                    <div className="space-y-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
                        <p>
                            I&apos;m drawn to the intersection of math and visual art — WebGL,
                            Three.js, shader programming, and the craft of making GPUs draw
                            beautiful things in real time.
                        </p>
                        <p>
                            Games were my first window into software. Pokémon specifically lit
                            the spark — the combination of systems design, real-time rendering,
                            and infinite replayability is still what I chase in everything I build.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {GRAPHICS_TOOLS.map(tool => (
                            <TechBadge key={tool.name} {...tool} />
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
