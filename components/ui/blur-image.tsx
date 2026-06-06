'use client'

import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

const SHIMMER_DATA_URL = `data:image/svg+xml;base64,${btoa(
    '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="hsl(0 0% 87%)"/></svg>'
)}`

export function BlurImage({ className, blurDataURL, fill, alt, ...props }: ImageProps) {
    return (
        <div className={cn('overflow-hidden', fill ? 'absolute inset-0' : 'relative')}>
            <Image
                {...props}
                alt={alt}
                fill={fill}
                placeholder="blur"
                blurDataURL={blurDataURL ?? SHIMMER_DATA_URL}
                className={cn('transition-all duration-500', className)}
            />
        </div>
    )
}
