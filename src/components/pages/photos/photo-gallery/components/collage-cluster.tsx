import { motion } from 'framer-motion'
import type { Photo } from '@/lib/api'
import { cn } from '@/lib/utils'
import { BlurImage } from '@/components/ui/blur-image'

const STRIP_THEMES = [
    { bg: 'bg-sky-100/80     dark:bg-sky-950/40' },
    { bg: 'bg-violet-100/80  dark:bg-violet-950/40' },
    { bg: 'bg-rose-100/80    dark:bg-rose-950/40' }
] as const

// Per-card pile config: rest = stacked, hover = fanned
const PILE = [
    {
        z: 1,
        rest: { rotate: -9, y: 14, scale: 0.92 },
        hover: { rotate: -18, y: 6, scale: 0.95, x: -12 }
    },
    {
        z: 3,
        rest: { rotate: 2, y: 0, scale: 1 },
        hover: { rotate: 1, y: -16, scale: 1.06, x: 0 }
    },
    {
        z: 2,
        rest: { rotate: 10, y: 12, scale: 0.92 },
        hover: { rotate: 18, y: 4, scale: 0.95, x: 12 }
    }
] as const

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 22 }

interface CollagePolaroidProps {
    photo: Photo
    index: number
    pileIndex: number
    marginLeft?: string
    onClick: (photo: Photo) => void
}

function CollagePolaroid({
    photo,
    index,
    pileIndex,
    marginLeft,
    onClick
}: CollagePolaroidProps) {
    const config = PILE[pileIndex]
    const theme = STRIP_THEMES[pileIndex]
    const label = `#${String(index + 1).padStart(3, '0')}`

    return (
        <motion.div
            variants={{
                rest: { ...config.rest },
                hover: { ...config.hover }
            }}
            transition={SPRING}
            style={{
                zIndex: config.z,
                width: '36%',
                flexShrink: 0,
                marginLeft
            }}
            className="cursor-pointer"
            onClick={e => {
                e.stopPropagation()
                onClick(photo)
            }}
        >
            <div className="overflow-hidden rounded-[3px] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.15)] dark:bg-zinc-900 dark:shadow-[0_4px_18px_rgba(0,0,0,0.5)]">
                <div className="p-2 pb-1.5">
                    <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-[1px]">
                        <BlurImage
                            src={photo.url}
                            width={400}
                            height={300}
                            alt={label}
                            loading="lazy"
                            sizes="(max-width: 640px) 36vw, 160px"
                            className="object-center"
                        />
                    </div>
                </div>
                <div
                    className={cn(
                        'flex h-8 items-center justify-center',
                        theme.bg
                    )}
                >
                    <span className="text-foreground/30 font-mono text-xs tracking-widest">
                        {label}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

interface CollageClusterProps {
    photos: Photo[] // exactly 3
    startIndex: number
    onPhotoClick: (photo: Photo) => void
}

export function CollageCluster({
    photos,
    startIndex,
    onPhotoClick
}: CollageClusterProps) {
    return (
        <motion.div
            className="col-span-2 flex items-end justify-center pt-6 pb-4"
            initial="rest"
            animate="rest"
            whileHover="hover"
        >
            {photos.slice(0, 3).map((photo, i) => (
                <CollagePolaroid
                    key={photo.key}
                    photo={photo}
                    index={startIndex + i}
                    pileIndex={i}
                    marginLeft={i > 0 ? '-2.75rem' : undefined}
                    onClick={onPhotoClick}
                />
            ))}
        </motion.div>
    )
}
