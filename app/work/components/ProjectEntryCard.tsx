'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SITE } from '@/content/site'
import { EntryBullets } from './EntryBullets'
import { AccentStyling } from '../shared/styles-config'
import { CardHeading, MonoText } from '@/components/ui/typography'

type ProjectEntry = (typeof SITE.work.projects)[number]

export function ProjectEntryCard({
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
            className={`rounded-xl border-2 border-dashed ${AccentStyling.violet.border} ${AccentStyling.violet.bg} mb-4 cursor-default px-3 py-4 sm:px-5 sm:py-5`}
        >
            <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="group/link inline-flex items-center gap-1.5 transition-colors hover:text-violet-500 dark:hover:text-violet-400"
            >
                <CardHeading className="text-xl text-foreground sm:text-2xl">
                    {entry.name}
                </CardHeading>
                <ExternalLink className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover/link:opacity-60" />
            </a>
            <MonoText className="mt-1 tracking-wider block">{entry.tech}</MonoText>
            <EntryBullets bullets={entry.bullets} accentType="violet" />
        </motion.div>
    )
}
