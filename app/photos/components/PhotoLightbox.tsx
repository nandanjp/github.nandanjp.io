'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MonoText } from '@/components/ui/typography'
import { netlifyImageSrc } from '@/lib/netlify-image-loader'
import { cn } from '@/lib/utils'
import type { Photo } from '@/lib/api'

interface PhotoLightboxProps {
    photo: Photo
    total: number
    currentIndex: number
    onClose: () => void
    onPrev: () => void
    onNext: () => void
}

const MAX_DOTS = 12

export function PhotoLightbox({
    photo,
    total,
    currentIndex,
    onClose,
    onPrev,
    onNext
}: PhotoLightboxProps) {
    const [loadedKey, setLoadedKey] = useState<string | null>(null)
    const imageLoaded = loadedKey === photo.key

    useEffect(() => {
        function handleKey(event: KeyboardEvent) {
            if (event.key === 'Escape') onClose()
            if (event.key === 'ArrowLeft') onPrev()
            if (event.key === 'ArrowRight') onNext()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose, onPrev, onNext])

    const progressPct = ((currentIndex + 1) / total) * 100
    const useDots = total <= MAX_DOTS

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
                onClick={onClose}
            >
                {/* Progress bar */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-white/10">
                    <motion.div
                        className="h-full bg-white/50"
                        initial={false}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                </div>

                {/* Close */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-white/60 hover:bg-white/10 hover:text-white"
                    onClick={onClose}
                >
                    <X className="size-4" />
                </Button>

                {/* Prev */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 left-4 z-10 -translate-y-1/2 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-20"
                    onClick={event => {
                        event.stopPropagation()
                        onPrev()
                    }}
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft className="size-6" />
                </Button>

                {/* Image container */}
                <motion.div
                    key={photo.key}
                    className="relative overflow-hidden rounded-2xl"
                    style={{ width: '85vw', height: '78vh' }}
                    initial={{ scale: 0.97, opacity: 0 }}
                    animate={{ scale: imageLoaded ? 1 : 0.97, opacity: imageLoaded ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    onClick={event => event.stopPropagation()}
                >
                    <Image
                        src={netlifyImageSrc(photo.url, 600, 60)}
                        alt={`Photo ${currentIndex + 1}`}
                        unoptimized
                        fill
                        priority
                        draggable={false}
                        className="object-contain shadow-2xl"
                        onLoad={() => setLoadedKey(photo.key)}
                    />
                </motion.div>

                {/* Next */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-20"
                    onClick={event => {
                        event.stopPropagation()
                        onNext()
                    }}
                    disabled={currentIndex === total - 1}
                >
                    <ChevronRight className="size-6" />
                </Button>

                {/* Position indicator */}
                <div className="absolute bottom-5 flex items-center gap-3">
                    {useDots ? (
                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: total }).map((_, dotIndex) => (
                                <div
                                    key={dotIndex}
                                    className={cn(
                                        'rounded-full transition-all duration-300',
                                        dotIndex === currentIndex
                                            ? 'size-2 bg-white/80'
                                            : 'size-1.5 bg-white/25'
                                    )}
                                />
                            ))}
                        </div>
                    ) : (
                        <MonoText className="tabular-nums text-white/40">
                            {currentIndex + 1} / {total}
                        </MonoText>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
