import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SITE } from '@/content/site'

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

export function HeroContent() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5"
        >
            {/* Section label */}
            <motion.p
                variants={item}
                className="text-muted-foreground font-mono text-xs tracking-[0.22em] uppercase"
            >
                {SITE.home.hero.label}
            </motion.p>

            {/* Name */}
            <motion.div variants={item}>
                <h1 className="font-hand text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl md:text-5xl lg:text-7xl">
                    {SITE.home.hero.heading.split('\n').map((line, i, arr) => (
                        <span key={i}>
                            {line}
                            {i < arr.length - 1 && <br />}
                        </span>
                    ))}
                </h1>
            </motion.div>

            {/* Status */}
            <motion.div variants={item} className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
                    {SITE.home.hero.status}
                </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
                variants={item}
                className="text-muted-foreground text-base leading-relaxed sm:text-lg"
            >
                {SITE.home.hero.tagline}
            </motion.p>

            {/* Currently building */}
            <motion.div
                variants={item}
                className="bg-muted/60 flex w-fit items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs"
            >
                <span className="text-primary/60">~/</span>
                <span className="text-muted-foreground">building</span>
                <span className="text-primary font-medium">
                    {SITE.home.hero.building.project1}
                </span>
                <span className="text-muted-foreground/30">+</span>
                <span className="text-primary font-medium">
                    {SITE.home.hero.building.project2}
                </span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
                <Link
                    to="/projects"
                    className={buttonVariants({ size: 'default' })}
                >
                    {SITE.home.hero.cta.primary}
                    <ArrowRight className="ml-1.5 size-3.5" />
                </Link>
                <Link
                    to="/blog"
                    className={buttonVariants({
                        variant: 'outline',
                        size: 'default'
                    })}
                >
                    {SITE.home.hero.cta.secondary}
                </Link>
            </motion.div>

            {/* Social */}
            <motion.div
                variants={item}
                className="flex items-center gap-3 pt-0.5"
            >
                <a
                    href={SITE.identity.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        'text-muted-foreground flex items-center gap-1.5 font-mono text-xs',
                        'hover:text-foreground transition-colors'
                    )}
                >
                    <GitHubIcon className="size-3.5 shrink-0" />
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
    )
}

function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    )
}
