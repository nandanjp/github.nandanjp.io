import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SITE } from '@/content/site'
import { HeroContent } from './components/hero-content'

export function Hero() {
    const [loaded, setLoaded] = useState(false)

    const rawUrl = SITE.identity.profileImageUrl
    const thumb = import.meta.env.DEV
        ? rawUrl
        : rawUrl
            ? `/.netlify/images?url=${encodeURIComponent(rawUrl)}&w=20&h=30&fit=cover&f=webp`
            : null
    const src = import.meta.env.DEV
        ? rawUrl
        : rawUrl
            ? `/.netlify/images?url=${encodeURIComponent(rawUrl)}&w=600&h=900&fit=cover&f=webp`
            : null

    return (
        <section className="relative min-h-[calc(100vh-3.5rem)] flex items-center">
            <div className="mx-auto w-full max-w-xl md:max-w-7xl px-4 sm:px-6 md:px-8 py-14 lg:py-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">

                <HeroContent />

                <div className="rounded-xl border bg-card/40 overflow-hidden shadow-sm max-w-sm mx-auto w-full">
                    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/40">
                        <span className="size-2.5 rounded-full bg-red-400/70" />
                        <span className="size-2.5 rounded-full bg-yellow-400/70" />
                        <span className="size-2.5 rounded-full bg-green-400/70" />
                        <span className="ml-auto font-mono text-xs text-muted-foreground">
                            profile.jpg
                        </span>
                    </div>
                    <div className="relative aspect-[3/4] md:aspect-[2/3] bg-muted/20">
                        {thumb && (
                            <img
                                src={thumb}
                                alt=""
                                aria-hidden
                                className={cn(
                                    'absolute inset-0 h-full w-full object-cover object-center blur-sm scale-105 transition-opacity duration-500',
                                    loaded ? 'opacity-0' : 'opacity-100',
                                )}
                            />
                        )}
                        {src && (
                            <img
                                src={src}
                                alt="Nandan Patel"
                                onLoad={() => setLoaded(true)}
                                className={cn(
                                    'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500',
                                    loaded ? 'opacity-100' : 'opacity-0',
                                )}
                            />
                        )}
                    </div>
                </div>

            </div>
        </section>
    )
}
