import { useCallback, useState } from 'react'
import { Image } from '@unpic/react'
import type { ImageProps } from '@unpic/react'
import { cn } from '@/lib/utils'
import { netlifyTransformer } from '@/lib/image'

// Renders inside an existing relative+overflow-hidden container (fills it absolutely).
// Handles the blur-up crossfade, cached-image detection, and unpic srcset/CDN transforms.
type BlurImageProps = Omit<ImageProps, 'transformer' | 'background' | 'layout'>

export function BlurImage({ src, width, height, alt, className, ...props }: BlurImageProps) {
    const [loaded, setLoaded] = useState(false)

    // If already in browser cache, onLoad fires before React attaches the listener
    const handleRef = useCallback((img: HTMLImageElement | null) => {
        if (img?.complete) setLoaded(true)
    }, [])

    const thumbSrc = typeof src === 'string' && netlifyTransformer
        ? netlifyTransformer({ url: src, width: 20 })
        : (src as string)

    return (
        <>
            <img
                src={thumbSrc}
                alt=""
                aria-hidden
                className={cn(
                    'absolute inset-0 h-full w-full object-cover object-center blur-sm scale-105 transition-opacity duration-500',
                    loaded ? 'opacity-0' : 'opacity-100',
                )}
            />
            <Image
                ref={handleRef as never}
                src={src}
                width={width}
                height={height}
                layout="constrained"
                transformer={netlifyTransformer}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={cn(
                    'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500',
                    loaded ? 'opacity-100' : 'opacity-0',
                    className,
                )}
                {...props}
            />
        </>
    )
}
