import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Image } from '@unpic/react'
import type { Photo } from '@/lib/api'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { netlifyCdn, netlifyTransformer } from '@/lib/image'

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
    const [imgLoaded, setImgLoaded] = useState(false)
    useEffect(() => {
        setImgLoaded(false)
    }, [photo.key])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onPrev()
            if (e.key === 'ArrowRight') onNext()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose, onPrev, onNext])

    const thumbUrl = netlifyTransformer?.(photo.url, { width: 60 }) ?? photo.url
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
                <div className="absolute top-0 right-0 left-0 h-[2px] bg-white/10">
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
                    <X className="size-5" />
                </Button>

                {/* Prev */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 left-4 z-10 -translate-y-1/2 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-20"
                    onClick={e => {
                        e.stopPropagation()
                        onPrev()
                    }}
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft className="size-6" />
                </Button>

                {/* Image */}
                <div
                    className="relative flex items-center justify-center"
                    onClick={e => e.stopPropagation()}
                >
                    <img
                        key={`thumb-${photo.key}`}
                        src={thumbUrl}
                        alt=""
                        aria-hidden
                        className={cn(
                            'absolute max-h-[78vh] max-w-[min(520px,85vw)] scale-105 rounded-lg object-contain blur-xl transition-opacity duration-300',
                            imgLoaded ? 'opacity-0' : 'opacity-100'
                        )}
                    />
                    <motion.div
                        key={photo.key}
                        initial={{ scale: 0.97 }}
                        animate={{ scale: imgLoaded ? 1 : 0.97 }}
                        transition={{ duration: 0.25 }}
                    >
                        <Image
                            src={photo.url}
                            width={250}
                            height={375}
                            layout="constrained"
                            cdn={netlifyCdn}
                            alt={`Photo ${currentIndex + 1}`}
                            sizes="250px"
                            onLoad={() => setImgLoaded(true)}
                            className={cn(
                                'max-h-[78vh] max-w-[min(520px,85vw)] rounded-lg shadow-2xl transition-opacity duration-300',
                                imgLoaded ? 'opacity-100' : 'opacity-0'
                            )}
                        />
                    </motion.div>
                </div>

                {/* Next */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-20"
                    onClick={e => {
                        e.stopPropagation()
                        onNext()
                    }}
                    disabled={currentIndex === total - 1}
                >
                    <ChevronRight className="size-6" />
                </Button>

                {/* Bottom indicators */}
                <div className="absolute bottom-5 flex items-center gap-3">
                    {useDots ? (
                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: total }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        'rounded-full transition-all duration-300',
                                        i === currentIndex
                                            ? 'size-2 bg-white/80'
                                            : 'size-1.5 bg-white/25'
                                    )}
                                />
                            ))}
                        </div>
                    ) : (
                        <span className="font-mono text-xs text-white/40 tabular-nums">
                            {currentIndex + 1} / {total}
                        </span>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
