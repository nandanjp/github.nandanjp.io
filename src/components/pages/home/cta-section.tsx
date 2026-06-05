import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function CtaSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section ref={ref} className="py-12 lg:py-16 border-t">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
                >
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50 mb-4">
                            [06] — say hello
                        </p>
                        <h2 className="font-hand font-bold text-4xl sm:text-5xl tracking-tight">
                            Let's build something<br className="hidden sm:block" /> together.
                        </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <motion.a
                            href="mailto:nandan.jp17@gmail.com"
                            style={{ rotate: '-1deg' }}
                            whileHover={{ rotate: 0, y: -3, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                            className="inline-flex items-center gap-2 font-hand font-bold text-lg px-5 py-2.5 rounded-lg border-2 border-dashed border-foreground/25 bg-card/60 hover:bg-card transition-colors"
                        >
                            nandan.jp17@gmail.com
                        </motion.a>
                        <motion.a
                            href="https://github.com/nandanjp"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ rotate: '0.8deg' }}
                            whileHover={{ rotate: 0, y: -3, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                            className="inline-flex items-center gap-2 font-mono text-sm px-4 py-2.5 rounded-lg border-2 border-dashed border-foreground/20 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            github/nandanjp
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
