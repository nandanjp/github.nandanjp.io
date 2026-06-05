import { lazy, Suspense } from 'react'
import { ClientOnly } from '@/components/client-only'
import { HeroContent } from './components/hero-content'

const BedroomScene = lazy(() => import('./components/bedroom-scene').then(m => ({ default: m.BedroomScene })))

export function Hero() {
    return (
        <section className="relative min-h-[calc(100vh-3.5rem)] flex items-center">
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 py-14 lg:py-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">

                {/* Hero text content — always first (top on mobile, left on desktop) */}
                <HeroContent />

                {/* 3D scene — below on mobile, right on desktop */}
                <div className="rounded-xl border bg-card/40 overflow-hidden shadow-sm">
                    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/40">
                        <span className="size-2.5 rounded-full bg-red-400/70" />
                        <span className="size-2.5 rounded-full bg-yellow-400/70" />
                        <span className="size-2.5 rounded-full bg-green-400/70" />
                        <span className="ml-auto font-mono text-xs text-muted-foreground">
                            bedroom.glb
                        </span>
                    </div>
                    <div className="h-[260px] sm:h-[300px] md:h-auto md:aspect-square">
                        <Suspense fallback={null}>
                            <ClientOnly>
                                <BedroomScene />
                            </ClientOnly>
                        </Suspense>
                    </div>
                </div>

            </div>
        </section>
    )
}
