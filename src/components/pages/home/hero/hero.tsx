import { HeroContent } from './components/hero-content'
import { SITE } from '@/content/site'
import { BlurImage } from '@/components/ui/blur-image'

export function Hero() {
    const rawUrl = SITE.identity.profileImageUrl

    return (
        <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center">
            <div className="mx-auto grid w-full max-w-xl grid-cols-1 items-center gap-6 px-4 py-14 sm:px-6 md:max-w-7xl md:grid-cols-2 md:gap-8 md:px-8 lg:gap-12 lg:py-20">
                <HeroContent />

                <div className="bg-card/40 mx-auto w-full max-w-md overflow-hidden rounded-xl border shadow-sm">
                    <div className="bg-muted/40 flex items-center gap-1.5 border-b px-4 py-2.5">
                        <span className="size-2.5 rounded-full bg-red-400/70" />
                        <span className="size-2.5 rounded-full bg-yellow-400/70" />
                        <span className="size-2.5 rounded-full bg-green-400/70" />
                        <span className="text-muted-foreground ml-auto font-mono text-xs">
                            profile.jpg
                        </span>
                    </div>
                    <div className="bg-muted/20 relative aspect-3/4 md:aspect-2/3">
                        {rawUrl && (
                            <BlurImage
                                src={rawUrl}
                                width={600}
                                height={900}
                                alt="Nandan Patel"
                                priority
                                sizes="(max-width: 768px) calc(100vw - 2rem), 448px"
                                className="object-center"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
