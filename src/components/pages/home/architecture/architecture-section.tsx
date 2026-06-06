import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE } from '@/content/site'
import { SectionHeading, SectionLabel, SubLabel } from '@/components/ui/typography'

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
        href: 'https://nandanjp.io',
        bg: 'bg-sky-50/80 dark:bg-sky-950/30',
        headerBg: 'bg-sky-100/60 dark:bg-sky-950/60',
        border: 'border-sky-200/70 dark:border-sky-800/40',
        muted: 'text-sky-500/70 dark:text-sky-400/50',
        pill: 'bg-sky-200/70 dark:bg-sky-800/50',
        bar: 'bg-sky-300/50 dark:bg-sky-700/40',
        accent: 'bg-sky-400/80 dark:bg-sky-500/60',
        urlBg: 'bg-white/60 dark:bg-sky-900/40'
    },
    {
        ...SITE.home.architecture.deployedApps[1],
        href: 'https://vault.nandan-hl.dev',
        bg: 'bg-rose-50/80 dark:bg-rose-950/30',
        headerBg: 'bg-rose-100/60 dark:bg-rose-950/60',
        border: 'border-rose-200/70 dark:border-rose-800/40',
        muted: 'text-rose-500/70 dark:text-rose-400/50',
        pill: 'bg-rose-200/70 dark:bg-rose-800/50',
        bar: 'bg-rose-300/50 dark:bg-rose-700/40',
        accent: 'bg-rose-400/80 dark:bg-rose-500/60',
        urlBg: 'bg-white/60 dark:bg-rose-900/40'
    },
    {
        ...SITE.home.architecture.deployedApps[2],
        href: 'https://dramalist.nandan-hl.dev',
        bg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
        headerBg: 'bg-emerald-100/60 dark:bg-emerald-950/60',
        border: 'border-emerald-200/70 dark:border-emerald-800/40',
        muted: 'text-emerald-500/70 dark:text-emerald-400/50',
        pill: 'bg-emerald-200/70 dark:bg-emerald-800/50',
        bar: 'bg-emerald-300/50 dark:bg-emerald-700/40',
        accent: 'bg-emerald-400/80 dark:bg-emerald-500/60',
        urlBg: 'bg-white/60 dark:bg-emerald-900/40'
    }
]

type AppCard = (typeof DEPLOYED_APPS)[number]

function PersonalSitePreview({ app }: { app: AppCard }) {
    return (
        <div className="space-y-2 p-3">
            <div className="flex items-center justify-between">
                <div className={cn('h-2.5 w-16 rounded-sm', app.accent)} />
                <div className="flex items-center gap-1.5">
                    <div className={cn('h-2 w-8 rounded-sm', app.bar)} />
                    <div className={cn('h-2 w-11 rounded-sm', app.bar)} />
                    <div className={cn('h-2 w-7 rounded-sm', app.bar)} />
                </div>
            </div>
            <div className={cn('h-px', app.bar)} />
            <div className="flex gap-3">
                <div className="flex-1 space-y-1.5">
                    <div className={cn('h-4 w-24 rounded-sm', app.accent)} />
                    <div className={cn('h-2.5 w-32 rounded-sm', app.bar)} />
                    <div className={cn('h-2 w-20 rounded-sm', app.pill)} />
                    <div className="flex gap-1.5 pt-0.5">
                        <div className={cn('h-4 w-16 rounded-sm', app.accent)} />
                        <div className={cn('h-4 w-11 rounded-sm border', app.pill, app.border)} />
                    </div>
                </div>
                <div className={cn('h-16 w-12 shrink-0 rounded-md', app.pill)} />
            </div>
        </div>
    )
}

function VaultPreview({ app }: { app: AppCard }) {
    return (
        <div className="space-y-2 p-3">
            <div className="flex gap-2">
                <div className={cn('h-5 flex-1 rounded-md border', app.urlBg, app.border)} />
                <div className={cn('h-5 w-14 rounded-md', app.accent)} />
            </div>
            <div className="grid grid-cols-3 gap-1.5">
                {[1, 0.8, 0.65, 0.9, 0.55, 0.75].map((opacity, i) => (
                    <div
                        key={i}
                        className={cn('aspect-square rounded', app.accent)}
                        style={{ opacity }}
                    />
                ))}
            </div>
        </div>
    )
}

function DramalistPreview({ app }: { app: AppCard }) {
    const items = [
        { badge: app.accent },
        { badge: app.bar },
        { badge: app.pill }
    ]
    const widths = ['w-28', 'w-20', 'w-24']
    return (
        <div className="space-y-2 p-3">
            <div className="flex items-center justify-between">
                <div className="flex gap-1">
                    <div className={cn('h-4 w-8 rounded-sm', app.accent)} />
                    <div className={cn('h-4 w-14 rounded-sm', app.bar)} />
                    <div className={cn('h-4 w-12 rounded-sm', app.pill)} />
                </div>
                <div className={cn('h-4 w-10 rounded-sm', app.pill)} />
            </div>
            <div className="space-y-1.5">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                        <div className={cn('h-2 shrink-0 rounded-sm', widths[i], app.bar)} />
                        <div className={cn('h-3.5 w-14 shrink-0 rounded opacity-75', item.badge)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

function DeployedApps() {
    return (
        <div className="flex flex-col gap-2.5">
            <SubLabel>{SITE.home.architecture.deploymentsLabel}</SubLabel>
            <div className="flex flex-col gap-3">
                {DEPLOYED_APPS.map((app, i) => (
                    <motion.a
                        key={app.name}
                        href={app.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            y: -2,
                            transition: { type: 'spring', stiffness: 320, damping: 22 }
                        }}
                        className={cn(
                            'block w-full overflow-hidden rounded-xl border shadow-sm',
                            'transition-shadow hover:shadow-md',
                            app.bg,
                            app.border
                        )}
                    >
                        {/* Browser chrome */}
                        <div
                            className={cn(
                                'flex items-center gap-2 border-b px-3 py-2',
                                app.headerBg,
                                app.border
                            )}
                        >
                            <div className="flex shrink-0 items-center gap-1">
                                <span className="size-2 rounded-full bg-red-400/70" />
                                <span className="size-2 rounded-full bg-yellow-400/70" />
                                <span className="size-2 rounded-full bg-green-400/70" />
                            </div>
                            <div
                                className={cn(
                                    'flex flex-1 items-center gap-1.5 overflow-hidden rounded-md px-2 py-0.5 font-mono text-[10px]',
                                    app.urlBg,
                                    app.muted
                                )}
                            >
                                <span className="shrink-0 leading-none">{app.emoji}</span>
                                <span className={cn('truncate', app.muted)}>{app.url}</span>
                            </div>
                            <ExternalLink className={cn('size-3 shrink-0', app.muted)} />
                        </div>
                        {/* App-specific mock content */}
                        {i === 0 && <PersonalSitePreview app={app} />}
                        {i === 1 && <VaultPreview app={app} />}
                        {i === 2 && <DramalistPreview app={app} />}
                    </motion.a>
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
                    <SectionLabel>{SITE.home.architecture.label}</SectionLabel>
                    <SectionHeading>
                        {SITE.home.architecture.heading}
                    </SectionHeading>
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
