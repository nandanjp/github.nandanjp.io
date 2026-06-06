import { useCallback, useState } from 'react'
import { Image } from '@unpic/react'
import type { ImageProps } from '@unpic/react'
import { cn } from '@/lib/utils'
import { netlifyCdn, netlifyTransformer } from '@/lib/image'

// Renders inside an existing relative+overflow-hidden container (fills it absolutely).
// Handles the blur-up crossfade, cached-image detection, and unpic srcset/CDN transforms.
// 'unstyled' is omitted so we can force it internally — constrained layout's
// inline max-width/max-height would otherwise fight the absolute-fill CSS.
type BlurImageProps = Omit<
    ImageProps,
    'background' | 'layout' | 'width' | 'height' | 'aspectRatio' | 'unstyled'
> & {
    width: number
    height: number
}

export function BlurImage({
    src,
    width,
    height,
    alt,
    className,
    priority,
    ...props
}: BlurImageProps) {
    const [loaded, setLoaded] = useState(false)

    // If already in browser cache, onLoad fires before React attaches the listener
    const handleRef = useCallback((img: HTMLImageElement | null) => {
        if (img?.complete) setLoaded(true)
    }, [])

    const thumbSrc =
        typeof src === 'string' && netlifyTransformer
            ? netlifyTransformer(src, { width: 20 })
            : src

    // Translate unpic's `priority` to the standard HTML fetchpriority attribute
    // rather than forwarding it — unpic v1 leaks it to the DOM <img> otherwise.
    const fp = priority ? ('high' as const) : undefined

    return (
        <>
            <img
                src={thumbSrc}
                alt=""
                aria-hidden
                fetchPriority={fp}
                className={cn(
                    'absolute inset-0 h-full w-full scale-105 object-cover object-center blur-sm transition-opacity duration-500',
                    loaded ? 'opacity-0' : 'opacity-100'
                )}
            />
            <Image
                ref={handleRef as never}
                src={src}
                width={width}
                height={height}
                layout="constrained"
                unstyled
                cdn={netlifyCdn}
                fetchPriority={fp}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={cn(
                    'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500',
                    loaded ? 'opacity-100' : 'opacity-0',
                    className
                )}
                {...props}
            />
        </>
    )
}
