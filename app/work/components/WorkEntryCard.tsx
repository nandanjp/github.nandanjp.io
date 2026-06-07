'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SITE } from '@/content/site'
import { EntryBullets } from './EntryBullets'
import { AccentStyling } from '../shared/styles-config'
import { BodyText, CardHeading, MonoText } from '@/components/ui/typography'
import type { CSSProperties } from 'react'

type WorkEntry = (typeof SITE.work.entries)[number]

export function WorkEntryCard({
    entry,
    index
}: {
    entry: WorkEntry
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
            className="mb-4"
        >
            <div
                style={{ '--r': `${entry.rotate}deg` } as CSSProperties}
                className={`rounded-xl border-2 border-dashed ${AccentStyling.sky.border} ${AccentStyling.sky.bg} cursor-default px-3 py-4 sm:px-5 sm:py-5 rotate-[var(--r)] transition-[rotate,translate] duration-200 ease-out hover:rotate-0 hover:-translate-y-[3px]`}
            >
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <CardHeading className="text-xl text-foreground sm:text-2xl">
                            {entry.company}
                        </CardHeading>
                        <BodyText className="font-hand mt-0.5">
                            {entry.role}
                        </BodyText>
                    </div>
                    <MonoText
                        className={`mt-1.5 shrink-0 rounded border border-dashed px-2 py-0.5 tabular-nums ${AccentStyling.sky.date}`}
                    >
                        {entry.period}
                    </MonoText>
                </div>
                <EntryBullets bullets={entry.bullets} accentType="sky" />
            </div>
        </motion.div>
    )
}
