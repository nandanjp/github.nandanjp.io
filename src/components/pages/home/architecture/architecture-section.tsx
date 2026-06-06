import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SITE } from '@/content/site'

const HAND_FONT = "'Caveat Variable', cursive"

interface Node {
    id: string
    label: string
    sub: string
    cx: number
    cy: number
    w: number
    h: number
    glow: string
}

const NODES: Node[] = [
    {
        id: 'client',
        label: 'Browser',
        sub: 'client',
        cx: 200,
        cy: 42,
        w: 120,
        h: 40,
        glow: '0 0 8px rgba(147,197,253,0.45)'
    },
    {
        id: 'ingress',
        label: 'Nginx Ingress',
        sub: 'k8s',
        cx: 200,
        cy: 130,
        w: 148,
        h: 40,
        glow: '0 0 8px rgba(134,239,172,0.45)'
    },
    {
        id: 'api',
        label: 'personal-api',
        sub: 'Go',
        cx: 200,
        cy: 222,
        w: 154,
        h: 48,
        glow: '0 0 8px rgba(94,234,212,0.45)'
    },
    {
        id: 'postgres',
        label: 'PostgreSQL',
        sub: 'db',
        cx: 72,
        cy: 342,
        w: 120,
        h: 40,
        glow: '0 0 8px rgba(125,211,252,0.45)'
    },
    {
        id: 'redis',
        label: 'Redis',
        sub: 'cache',
        cx: 200,
        cy: 342,
        w: 96,
        h: 40,
        glow: '0 0 8px rgba(253,164,175,0.45)'
    },
    {
        id: 'minio',
        label: 'MinIO',
        sub: 'S3',
        cx: 328,
        cy: 342,
        w: 96,
        h: 40,
        glow: '0 0 8px rgba(253,186,116,0.45)'
    }
]

// Arrow: from bottom/side of source to top/side of target
const ARROWS: { d: string }[] = [
    // client → ingress (straight down)
    { d: 'M 200,62 L 200,110' },
    // ingress → api (straight down)
    { d: 'M 200,150 L 200,198' },
    // api → postgres (curved left)
    { d: 'M 200,246 C 200,290 72,290 72,322' },
    // api → redis (straight down)
    { d: 'M 200,246 L 200,322' },
    // api → minio (curved right)
    { d: 'M 200,246 C 200,290 328,290 328,322' }
]

const DEPLOYED_APPS = [
    {
        ...SITE.home.architecture.deployedApps[0],
        rotate: -1.6,
        bg: 'bg-sky-100/80   dark:bg-sky-950/40',
        border: 'border-sky-300/60 dark:border-sky-700/50',
        text: 'text-sky-800    dark:text-sky-200',
        sub: 'text-sky-500/70 dark:text-sky-400/60'
    },
    {
        ...SITE.home.architecture.deployedApps[1],
        rotate: 1.2,
        bg: 'bg-rose-100/80   dark:bg-rose-950/40',
        border: 'border-rose-300/60 dark:border-rose-700/50',
        text: 'text-rose-800    dark:text-rose-200',
        sub: 'text-rose-500/70 dark:text-rose-400/60'
    },
    {
        ...SITE.home.architecture.deployedApps[2],
        rotate: -0.8,
        bg: 'bg-emerald-100/80   dark:bg-emerald-950/40',
        border: 'border-emerald-300/60 dark:border-emerald-700/50',
        text: 'text-emerald-800    dark:text-emerald-200',
        sub: 'text-emerald-500/70 dark:text-emerald-400/60'
    }
] as const

function DeployedApps() {
    return (
        <div className="flex flex-col gap-2.5">
            <p className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
                {SITE.home.architecture.deploymentsLabel}
            </p>
            <div className="flex flex-wrap gap-2.5">
                {DEPLOYED_APPS.map(app => (
                    <motion.div
                        key={app.name}
                        style={{ rotate: `${app.rotate}deg` }}
                        whileHover={{
                            scale: 1.05,
                            y: -3,
                            transition: {
                                type: 'spring',
                                stiffness: 320,
                                damping: 22
                            }
                        }}
                        className={cn(
                            'flex cursor-default items-center gap-2.5 rounded-lg border-2 border-dashed px-3 py-2',
                            app.bg,
                            app.border
                        )}
                    >
                        <span className="text-xl leading-none">
                            {app.emoji}
                        </span>
                        <div>
                            <p
                                className={cn(
                                    'font-hand text-sm leading-tight font-bold',
                                    app.text
                                )}
                            >
                                {app.name}
                            </p>
                            <p
                                className={cn(
                                    'font-mono text-xs leading-tight',
                                    app.sub
                                )}
                            >
                                {app.url}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

function ArchitectureDiagram() {
    return (
        <svg
            viewBox="0 0 400 400"
            width="100%"
            aria-label="Systems architecture diagram"
            style={{ fontFamily: HAND_FONT }}
        >
            <defs>
                {/* Dot grid pattern */}
                <pattern
                    id="dots"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                >
                    <circle
                        cx="1"
                        cy="1"
                        r="1"
                        className="fill-foreground"
                        opacity="0.08"
                    />
                </pattern>

                {/* Rough/sketchy displacement filter */}
                <filter id="rough" x="-8%" y="-8%" width="116%" height="116%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.045"
                        numOctaves="4"
                        seed="5"
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

                {/* Arrowhead marker */}
                <marker
                    id="arrow"
                    markerWidth="9"
                    markerHeight="7"
                    refX="8"
                    refY="3.5"
                    orient="auto"
                >
                    <path
                        d="M 0 0 L 9 3.5 L 0 7 Z"
                        className="fill-foreground"
                        opacity="0.5"
                    />
                </marker>
            </defs>

            {/* Dot grid background */}
            <rect width="400" height="400" fill="url(#dots)" />

            {/* k8s cluster boundary */}
            <rect
                x="8"
                y="108"
                width="384"
                height="288"
                rx="10"
                ry="10"
                className="fill-primary/5 stroke-primary/25"
                strokeWidth="1.5"
                strokeDasharray="8 4"
                filter="url(#rough)"
            />
            <text
                x="20"
                y="124"
                className="fill-primary/50"
                fontSize="12"
                style={{ fontFamily: HAND_FONT }}
            >
                {SITE.home.architecture.clusterLabel}
            </text>

            {/* Arrows */}
            {ARROWS.map((arrow, i) => (
                <path
                    key={i}
                    d={arrow.d}
                    className="stroke-foreground/40"
                    strokeWidth="1.8"
                    fill="none"
                    markerEnd="url(#arrow)"
                    filter="url(#rough)"
                />
            ))}

            {/* Nodes */}
            {NODES.map(node => (
                <motion.g
                    key={node.id}
                    style={{
                        transformOrigin: `${node.cx}px ${node.cy}px`,
                        cursor: 'pointer'
                    }}
                    whileHover={{
                        scale: 1.07,
                        filter: `drop-shadow(${node.glow})`
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                >
                    <rect
                        x={node.cx - node.w / 2}
                        y={node.cy - node.h / 2}
                        width={node.w}
                        height={node.h}
                        rx="7"
                        ry="7"
                        className="fill-card stroke-foreground/30"
                        strokeWidth="1.6"
                        filter="url(#rough)"
                    />
                    <text
                        x={node.cx}
                        y={node.cy - 4}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="15"
                        fontWeight="700"
                        className="fill-foreground"
                        style={{ fontFamily: HAND_FONT }}
                    >
                        {node.label}
                    </text>
                    <text
                        x={node.cx}
                        y={node.cy + 12}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="12"
                        className="fill-muted-foreground"
                        style={{ fontFamily: HAND_FONT }}
                    >
                        {node.sub}
                    </text>
                </motion.g>
            ))}
        </svg>
    )
}

export function ArchitectureSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} className="border-t py-16 lg:py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 px-4 sm:px-6 md:grid-cols-[1fr_1.4fr] md:gap-10 md:px-8"
            >
                {/* Text */}
                <div className="flex flex-col gap-5">
                    <p className="text-muted-foreground font-mono text-xs tracking-[0.22em] uppercase">
                        {SITE.home.architecture.label}
                    </p>
                    <h2 className="font-hand text-4xl font-bold tracking-tight sm:text-5xl">
                        {SITE.home.architecture.heading}
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        {SITE.home.architecture.body}
                    </p>
                    <DeployedApps />
                </div>

                {/* Diagram */}
                <div className="bg-card/40 overflow-hidden rounded-xl border shadow-sm">
                    <div className="bg-muted/40 flex items-center gap-1.5 border-b px-4 py-2.5">
                        <span className="size-2.5 rounded-full bg-red-400/70" />
                        <span className="size-2.5 rounded-full bg-yellow-400/70" />
                        <span className="size-2.5 rounded-full bg-green-400/70" />
                        <span className="text-muted-foreground ml-auto font-mono text-xs">
                            {SITE.home.architecture.filename}
                        </span>
                    </div>
                    <div className="p-4 sm:p-6">
                        <ArchitectureDiagram />
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
