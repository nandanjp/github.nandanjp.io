'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SITE } from '@/content/site'
import { SectionLabel, SectionHeading } from '@/components/ui/typography'

export function CtaSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section ref={ref} className="border-t py-12 lg:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div>
                        <SectionLabel className="mb-4">{SITE.home.cta.label}</SectionLabel>
                        <SectionHeading>{SITE.home.cta.heading}</SectionHeading>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-3">
                        <motion.a
                            href={`mailto:${SITE.identity.email}`}
                            style={{ rotate: '-1deg' }}
                            whileHover={{
                                rotate: 0,
                                y: -3,
                                transition: { type: 'spring', stiffness: 300, damping: 22 }
                            }}
                            className="font-hand border-foreground/25 bg-card/60 hover:bg-card inline-flex items-center gap-2 rounded-lg border-2 border-dashed px-5 py-2.5 text-lg font-bold transition-colors"
                        >
                            {SITE.identity.email}
                        </motion.a>
                        <motion.a
                            href={SITE.identity.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ rotate: '0.8deg' }}
                            whileHover={{
                                rotate: 0,
                                y: -3,
                                transition: { type: 'spring', stiffness: 300, damping: 22 }
                            }}
                            className="border-foreground/20 text-muted-foreground hover:text-foreground inline-flex items-center gap-2 rounded-lg border-2 border-dashed px-4 py-2.5 font-mono text-sm transition-colors"
                        >
                            github/{SITE.identity.github}
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
