'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SITE } from '@/content/site'
import { BodyText, CardHeading } from '@/components/ui/typography'
import { MacWindowHeader } from '@/components/ui/mac-card'
import { cn } from '@/lib/utils'
import { WorkEntryCard } from './WorkEntryCard'
import { ProjectEntryCard } from './ProjectEntryCard'
import { AccentStyling, type AccentType } from '../shared/styles-config'

function SectionDivider({
    label,
    accentType
}: {
    label: string
    accentType: AccentType
}) {
    const accent = AccentStyling[accentType]
    return (
        <div className="my-10 flex items-center gap-4">
            <div className={cn('flex-1 border-t-2 border-dashed', accent.line)} />
            <CardHeading
                className={cn('text-2xl select-none', accent.label)}
                aria-hidden="true"
            >
                {label}
            </CardHeading>
            <div className={cn('flex-1 border-t-2 border-dashed', accent.line)} />
        </div>
    )
}

export function WorkContent() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <div
            ref={ref}
            className="bg-card/30 border-foreground/20 overflow-hidden rounded-2xl border border-dashed shadow-sm"
        >
            {/* Mac chrome */}
            <MacWindowHeader
                title={SITE.work.filename}
                className="bg-muted/20 border-foreground/15 border-dashed"
            />

            <div className="relative">
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
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-2"
                    >
                        <h1 className="font-hand bg-linear-to-r from-sky-500 to-violet-500 bg-clip-text text-6xl leading-none font-bold tracking-tight text-transparent sm:text-7xl">
                            {SITE.work.resumeName}
                        </h1>
                        <BodyText className="font-hand mt-2 text-xl">
                            {SITE.work.resumeBio}
                        </BodyText>
                    </motion.div>

                    <SectionDivider
                        label={SITE.work.experienceLabel}
                        accentType="sky"
                    />
                    {SITE.work.entries.map((entry, i) => (
                        <WorkEntryCard key={entry.company} entry={entry} index={i} />
                    ))}

                    <SectionDivider
                        label={SITE.work.projectsLabel}
                        accentType="violet"
                    />
                    {SITE.work.projects.map((entry, i) => (
                        <ProjectEntryCard key={entry.name} entry={entry} index={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}
