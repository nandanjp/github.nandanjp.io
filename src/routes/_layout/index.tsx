import { createFileRoute } from '@tanstack/react-router'
import { SITE } from '@/content/site'
import { netlifyTransformer } from '@/lib/image'
import { Hero } from '@/components/pages/home/hero/hero'
import { AboutSection } from '@/components/pages/home/about/about-section'
import { ArchitectureSection } from '@/components/pages/home/architecture/architecture-section'
import { GraphicsSection } from '@/components/pages/home/graphics/graphics-section'
import { InterestsSection } from '@/components/pages/home/interests/interests-section'
import { CtaSection } from '@/components/pages/home/cta-section'

const heroImageSrc = import.meta.env.DEV
    ? null
    : SITE.identity.profileImageUrl
      ? (netlifyTransformer?.(SITE.identity.profileImageUrl, {
            width: 600,
            height: 900
        }) ?? null)
      : null

export const Route = createFileRoute('/_layout/')({
    component: HomePage,
    head: () => ({
        meta: [
            { title: 'Nandan Patel — Software Engineer' },
            {
                name: 'description',
                content:
                    'Software engineer building fast systems, elegant UIs, and open-source tools.'
            }
        ],
        links: heroImageSrc
            ? [{ rel: 'preload', as: 'image', href: heroImageSrc }]
            : []
    })
})

function HomePage() {
    return (
        <>
            <Hero />
            <AboutSection />
            <ArchitectureSection />
            <GraphicsSection />
            <InterestsSection />
            <CtaSection />
        </>
    )
}
