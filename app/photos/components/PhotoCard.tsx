'use client'

import { BlurImage } from '@/components/ui/blur-image'
import { netlifyImageSrc, netlifyThumbnailSrc } from '@/lib/netlify-image-loader'
import { cn } from '@/lib/utils'
import type { CSSProperties } from 'react'
import type { Photo } from '@/lib/api'

const STRIP_THEMES = [
    {
        bg: 'bg-sky-100/80 dark:bg-sky-950/40',
        glow: '0 0 18px 2px rgba(147,197,253,0.35)'
    },
    {
        bg: 'bg-violet-100/80 dark:bg-violet-950/40',
        glow: '0 0 18px 2px rgba(196,181,253,0.35)'
    },
    {
        bg: 'bg-emerald-100/80 dark:bg-emerald-950/40',
        glow: '0 0 18px 2px rgba(110,231,183,0.30)'
    },
    {
        bg: 'bg-rose-100/80 dark:bg-rose-950/40',
        glow: '0 0 18px 2px rgba(253,164,175,0.35)'
    },
    {
        bg: 'bg-amber-100/80 dark:bg-amber-950/40',
        glow: '0 0 18px 2px rgba(252,211,77,0.30)'
    },
    {
        bg: 'bg-teal-100/80 dark:bg-teal-950/40',
        glow: '0 0 18px 2px rgba(94,234,212,0.30)'
    }
] as const

const ROTATIONS = [-1.8, 1.2, -0.7, 1.5, -1.1, 0.9] as const

interface PhotoCardProps {
    photo: Photo
    index: number
    priority?: boolean
    onClick: (photo: Photo) => void
}

export function PhotoCard({ photo, index, priority = false, onClick }: PhotoCardProps) {
    const theme = STRIP_THEMES[index % STRIP_THEMES.length]
    const rotation = ROTATIONS[index % ROTATIONS.length]
    const label = `#${String(index + 1).padStart(3, '0')}`

    return (
        <div className="w-full max-w-[280px]">
            <div
                style={{ '--r': `${rotation}deg`, '--photo-glow': theme.glow } as CSSProperties}
                className="cursor-pointer rounded-[3px] rotate-[var(--r)] transition-[rotate,scale,translate] duration-300 ease-out hover:rotate-0 hover:scale-[1.03] hover:-translate-y-[6px] hover:[box-shadow:var(--photo-glow)]"
                onClick={() => onClick(photo)}
            >
                <div className="overflow-hidden rounded-[3px] bg-white shadow-[0_3px_14px_rgba(0,0,0,0.13)] dark:bg-zinc-900 dark:shadow-[0_3px_14px_rgba(0,0,0,0.45)]">
                    <div className="p-2 pb-1.5">
                        <div className="bg-muted relative aspect-square overflow-hidden rounded-[1px]">
                            <BlurImage
                                src={netlifyImageSrc(photo.url, 280, 30)}
                                thumbnailSrc={netlifyThumbnailSrc(photo.url)}
                                alt={label}
                                fill
                                priority={priority}
                                draggable={false}
                                className="object-cover object-center"
                            />
                        </div>
                    </div>

                    <div className={cn('flex h-8 items-center justify-center px-3', theme.bg)}>
                        <span className="font-mono text-xs tracking-widest text-foreground/90">{label}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
