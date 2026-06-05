import { useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

type MdxImageProps = ComponentPropsWithoutRef<'img'>

export function MdxImage({ src, alt, className, ...props }: MdxImageProps) {
    const [loaded, setLoaded] = useState(false)
    const [errored, setErrored] = useState(false)
    const optimizedSrc = src && !import.meta.env.DEV
        ? `/.netlify/images?url=${encodeURIComponent(src)}&w=1200&f=webp`
        : src

    return (
        <figure className="my-8 not-prose">
            <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
                {!loaded && !errored && (
                    <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                )}
                {errored ? (
                    <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                        Image failed to load
                    </div>
                ) : (
                    <img
                        src={optimizedSrc}
                        alt={alt ?? ''}
                        loading="lazy"
                        onLoad={() => setLoaded(true)}
                        onError={() => setErrored(true)}
                        className={cn(
                            'block w-full object-cover transition-opacity duration-500',
                            loaded ? 'opacity-100' : 'opacity-0',
                            !loaded && 'min-h-48',
                            className
                        )}
                        {...props}
                    />
                )}
            </div>
            {alt && (
                <figcaption className="mt-2.5 text-center font-mono text-xs text-muted-foreground">
                    {alt}
                </figcaption>
            )}
        </figure>
    )
}
