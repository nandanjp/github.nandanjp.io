import { HeroContent } from './components/hero-content'
import { SITE } from '@/content/site'
import { BlurImage } from '@/components/ui/blur-image'

export function Hero() {
    const rawUrl = SITE.identity.profileImageUrl

    return (
        <section className="relative flex items-center">
            <div className="mx-auto grid w-full max-w-xl grid-cols-1 items-center gap-4 px-4 py-10 sm:px-6 md:max-w-6xl md:grid-cols-2 md:gap-6 md:px-8 lg:py-14">
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
                    <div className="bg-muted/20 relative aspect-square">
                        {rawUrl && (
                            <BlurImage
                                src={rawUrl}
                                width={448}
                                height={448}
                                alt="Nandan Patel"
                                priority
                                sizes="(max-width: 448px) 100vw, 448px"
                                className="object-center"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
