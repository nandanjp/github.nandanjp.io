import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { BlurImage } from '@/components/ui/blur-image'
import type { Photo } from '@/lib/api'

const STRIP_THEMES = [
    { bg: 'bg-sky-100/80     dark:bg-sky-950/40',     glow: '0 0 18px 2px rgba(147,197,253,0.35)' },
    { bg: 'bg-violet-100/80  dark:bg-violet-950/40',  glow: '0 0 18px 2px rgba(196,181,253,0.35)' },
    { bg: 'bg-emerald-100/80 dark:bg-emerald-950/40', glow: '0 0 18px 2px rgba(110,231,183,0.30)' },
    { bg: 'bg-rose-100/80    dark:bg-rose-950/40',    glow: '0 0 18px 2px rgba(253,164,175,0.35)' },
    { bg: 'bg-amber-100/80   dark:bg-amber-950/40',   glow: '0 0 18px 2px rgba(252,211,77,0.30)'  },
    { bg: 'bg-teal-100/80    dark:bg-teal-950/40',    glow: '0 0 18px 2px rgba(94,234,212,0.30)'  },
] as const

const ROTATIONS = [-1.8, 1.2, -0.7, 1.5, -1.1, 0.9] as const

interface PhotoCardProps {
    photo: Photo
    index: number
    onClick: (photo: Photo) => void
}

export function PhotoCard({ photo, index, onClick }: PhotoCardProps) {
    const theme = STRIP_THEMES[index % STRIP_THEMES.length]
    const rotation = ROTATIONS[index % ROTATIONS.length]
    const label = `#${String(index + 1).padStart(3, '0')}`

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
                rotate: 0,
                scale: 1.03,
                y: -6,
                boxShadow: theme.glow,
                transition: { type: 'spring', stiffness: 280, damping: 20 },
            }}
            style={{ rotate: `${rotation}deg` }}
            className="cursor-pointer rounded-[3px]"
            onClick={() => onClick(photo)}
        >
            {/* Polaroid paper */}
            <div className="rounded-[3px] overflow-hidden bg-white dark:bg-zinc-900 shadow-[0_3px_14px_rgba(0,0,0,0.13)] dark:shadow-[0_3px_14px_rgba(0,0,0,0.45)]">
                <div className="p-2 pb-1.5">
                    <div className="relative aspect-4/3 overflow-hidden rounded-[1px] bg-muted">
                        <BlurImage
                            src={photo.url}
                            width={600}
                            height={450}
                            alt={label}
                            loading="lazy"
                            sizes="(max-width: 640px) calc(50vw - 2rem), 300px"
                            className="object-center"
                        />
                    </div>
                </div>

                {/* Polaroid bottom strip */}
                <div className={cn('h-8 flex items-center justify-center px-3', theme.bg)}>
                    <span className="font-mono text-xs tracking-widest text-foreground/30">
                        {label}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}
