import { useState } from 'react'
import { Image } from '@unpic/react'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { netlifyCdn } from '@/lib/image'

type MdxImageProps = ComponentPropsWithoutRef<'img'>

export function MdxImage({ src, alt, className }: MdxImageProps) {
    const [errored, setErrored] = useState(false)

    return (
        <figure className="not-prose my-8">
            <div className="border-border bg-muted relative overflow-hidden rounded-xl border">
                {errored ? (
                    <div className="text-muted-foreground flex h-48 items-center justify-center text-sm">
                        Image failed to load
                    </div>
                ) : src ? (
                    <Image
                        src={src}
                        layout="fullWidth"
                        cdn={netlifyCdn}
                        background="auto"
                        alt={alt ?? ''}
                        loading="lazy"
                        onError={() => setErrored(true)}
                        className={cn('block w-full', className)}
                    />
                ) : null}
            </div>
            {alt && (
                <figcaption className="text-muted-foreground mt-2.5 text-center font-mono text-xs">
                    {alt}
                </figcaption>
            )}
        </figure>
    )
}
