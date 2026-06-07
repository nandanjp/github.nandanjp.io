'use client'

import { motion } from 'framer-motion'
import { BlurImage } from '@/components/ui/blur-image'
import { netlifyImageSrc, netlifyThumbnailSrc } from '@/lib/netlify-image-loader'
import { cn } from '@/lib/utils'
import type { Photo } from '@/lib/api'

const STRIP_THEMES = [
    { bg: 'bg-sky-100/80 dark:bg-sky-950/40' },
    { bg: 'bg-violet-100/80 dark:bg-violet-950/40' },
    { bg: 'bg-rose-100/80 dark:bg-rose-950/40' }
] as const

const PILE_CONFIG = [
    {
        zIndex: 1,
        rest: { rotate: -9, y: 14, scale: 0.92 },
        hover: { rotate: -18, y: 6, scale: 0.95, x: -12 }
    },
    {
        zIndex: 3,
        rest: { rotate: 2, y: 0, scale: 1 },
        hover: { rotate: 1, y: -16, scale: 1.06, x: 0 }
    },
    {
        zIndex: 2,
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

function CollagePolaroid({ photo, index, pileIndex, marginLeft, onClick }: CollagePolaroidProps) {
    const config = PILE_CONFIG[pileIndex]
    const theme = STRIP_THEMES[pileIndex]
    const label = `#${String(index + 1).padStart(3, '0')}`

    return (
        <motion.div
            variants={{
                rest: { ...config.rest },
                hover: { ...config.hover }
            }}
            transition={SPRING}
            style={{ zIndex: config.zIndex, width: '36%', flexShrink: 0, marginLeft }}
            className="cursor-pointer"
            onClick={event => {
                event.stopPropagation()
                onClick(photo)
            }}
        >
            <div className="overflow-hidden rounded-[3px] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.15)] dark:bg-zinc-900 dark:shadow-[0_4px_18px_rgba(0,0,0,0.5)]">
                <div className="p-2 pb-1.5">
                    <div className="bg-muted relative aspect-square overflow-hidden rounded-[1px]">
                        <BlurImage
                            src={netlifyImageSrc(photo.url, 280, 30)}
                            thumbnailSrc={netlifyThumbnailSrc(photo.url)}
                            alt={label}
                            fill
                            draggable={false}
                            loading="eager"
                            fetchPriority="high"
                            className="object-cover object-center"
                        />
                    </div>
                </div>
                <div className={cn('flex h-8 items-center justify-center', theme.bg)}>
                    <span className="font-mono text-xs tracking-widest text-foreground/90">{label}</span>
                </div>
            </div>
        </motion.div>
    )
}

interface CollageClusterProps {
    photos: Photo[]
    startIndex: number
    onPhotoClick: (photo: Photo) => void
}

export function CollageCluster({ photos, startIndex, onPhotoClick }: CollageClusterProps) {
    return (
        <motion.div
            className="col-span-2 flex w-full items-end justify-center pt-6 pb-4"
            initial="rest"
            animate="rest"
            whileHover="hover"
        >
            {photos.slice(0, 3).map((photo, pileIndex) => (
                <CollagePolaroid
                    key={photo.key}
                    photo={photo}
                    index={startIndex + pileIndex}
                    pileIndex={pileIndex}
                    marginLeft={pileIndex > 0 ? '-2.75rem' : undefined}
                    onClick={onPhotoClick}
                />
            ))}
        </motion.div>
    )
}
