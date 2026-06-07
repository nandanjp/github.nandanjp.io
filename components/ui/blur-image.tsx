'use client'

import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { useState, useTransition } from 'react'
import { cn } from '@/lib/utils'

interface BlurImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
    thumbnailSrc?: string
}

export function BlurImage({ className, fill, alt, thumbnailSrc, ...props }: BlurImageProps) {
    const [loaded, setLoaded] = useState(false)
    const [, startTransition] = useTransition()

    return (
        <div className={cn('overflow-hidden', fill ? 'absolute inset-0' : 'relative')}>
            {thumbnailSrc && (
                <div
                    aria-hidden="true"
                    className={cn(
                        'absolute inset-0 transition-opacity duration-300',
                        loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    )}
                    style={{
                        backgroundImage: `url(${thumbnailSrc})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(12px)',
                        transform: 'scale(1.12)'
                    }}
                />
            )}
            <Image
                {...props}
                alt={alt}
                fill={fill}
                unoptimized
                onLoad={() => startTransition(() => setLoaded(true))}
                className={cn(
                    'transition-opacity duration-300',
                    loaded ? 'opacity-100' : 'opacity-0',
                    className
                )}
            />
        </div>
    )
}
