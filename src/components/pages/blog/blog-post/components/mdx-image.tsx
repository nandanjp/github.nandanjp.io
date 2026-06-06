import { useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { Image } from '@unpic/react'
import { cn } from '@/lib/utils'
import { netlifyTransformer } from '@/lib/image'

type MdxImageProps = ComponentPropsWithoutRef<'img'>

export function MdxImage({ src, alt, className }: MdxImageProps) {
    const [errored, setErrored] = useState(false)

    return (
        <figure className="my-8 not-prose">
            <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
                {errored ? (
                    <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                        Image failed to load
                    </div>
                ) : src ? (
                    <Image
                        src={src}
                        width={1200}
                        layout="fullWidth"
                        background="auto"
                        transformer={netlifyTransformer}
                        alt={alt ?? ''}
                        loading="lazy"
                        onError={() => setErrored(true)}
                        className={cn('block w-full', className)}
                    />
                ) : null}
            </div>
            {alt && (
                <figcaption className="mt-2.5 text-center font-mono text-xs text-muted-foreground">
                    {alt}
                </figcaption>
            )}
        </figure>
    )
}
