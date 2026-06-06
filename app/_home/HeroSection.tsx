'use client'

import Link from 'next/link'
import { BlurImage } from '@/components/ui/blur-image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/components/Icon'
import { buttonVariants } from '@/components/ui/button'
import { SITE } from '@/content/site'
import { cn } from '@/lib/utils'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.09, delayChildren: 0.15 }
    }
}

const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
    }
}

export function HeroSection() {
    const profileImageUrl = SITE.identity.profileImageUrl

    return (
        <section className="relative flex items-center">
            <div className="mx-auto grid w-full max-w-xl grid-cols-1 items-center gap-4 px-4 py-10 sm:px-6 md:max-w-6xl md:grid-cols-2 md:gap-6 md:px-8 lg:py-14">
                {/* Content */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-3"
                >
                    <motion.p
                        aria-hidden="true"
                        variants={item}
                        className="text-muted-foreground font-mono text-xs tracking-[0.22em] uppercase"
                    >
                        {SITE.home.hero.label}
                    </motion.p>

                    <motion.div variants={item}>
                        <h1 className="font-hand text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl md:text-5xl lg:text-7xl">
                            {SITE.home.hero.heading.split('\n').map((line, lineIndex, lines) => (
                                <span key={lineIndex}>
                                    {line}
                                    {lineIndex < lines.length - 1 && <br />}
                                </span>
                            ))}
                        </h1>
                    </motion.div>

                    <motion.div variants={item} className="flex items-center gap-2">
                        <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
                            {SITE.home.hero.status}
                        </span>
                    </motion.div>

                    <motion.p
                        variants={item}
                        className="text-muted-foreground text-base leading-relaxed sm:text-lg"
                    >
                        {SITE.home.hero.tagline}
                    </motion.p>

                    <motion.div
                        variants={item}
                        className="bg-muted/60 flex w-fit items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs"
                    >
                        <span className="text-primary/60">~/</span>
                        <span className="text-muted-foreground">building</span>
                        <span className="text-primary font-medium">{SITE.home.hero.building.project1}</span>
                        <span className="text-muted-foreground/30">+</span>
                        <span className="text-primary font-medium">{SITE.home.hero.building.project2}</span>
                    </motion.div>

                    <motion.div variants={item} className="flex flex-wrap gap-3">
                        <Link href="/projects" className={buttonVariants({ size: 'default' })}>
                            {SITE.home.hero.cta.primary}
                            <ArrowRight className="ml-1.5 size-3.5" />
                        </Link>
                        <Link href="/blog" className={buttonVariants({ variant: 'outline', size: 'default' })}>
                            {SITE.home.hero.cta.secondary}
                        </Link>
                    </motion.div>

                    <motion.div variants={item} className="flex items-center gap-3">
                        <a
                            href={SITE.identity.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                'text-muted-foreground flex items-center gap-1.5 font-mono text-xs',
                                'hover:text-foreground transition-colors'
                            )}
                        >
                            <Icon.GitHub className="size-3.5 shrink-0" />
                            {SITE.identity.github}
                        </a>
                        <span className="text-border text-xs">·</span>
                        <a
                            href={`mailto:${SITE.identity.email}`}
                            className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                        >
                            {SITE.identity.email}
                        </a>
                    </motion.div>
                </motion.div>

                {/* Profile image card */}
                <div className="bg-card/40 mx-auto w-full max-w-md overflow-hidden rounded-xl border shadow-sm">
                    <div className="bg-muted/40 flex items-center gap-1.5 border-b px-4 py-2.5">
                        <span className="size-2.5 rounded-full bg-red-400/70" />
                        <span className="size-2.5 rounded-full bg-yellow-400/70" />
                        <span className="size-2.5 rounded-full bg-green-400/70" />
                        <span className="text-muted-foreground ml-auto font-mono text-xs">profile.jpg</span>
                    </div>
                    <div className="bg-muted/20 relative aspect-square">
                        {profileImageUrl && (
                            <BlurImage
                                src={profileImageUrl}
                                fill
                                alt="Nandan Patel"
                                loading="eager"
                                fetchPriority="high"
                                sizes="(max-width: 768px) 100vw, 448px"
                                quality={80}
                                className="object-cover object-center"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
