import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/pages/home/hero/hero'
import { AboutSection } from '@/components/pages/home/about/about-section'
import { ArchitectureSection } from '@/components/pages/home/architecture/architecture-section'
import { GraphicsSection } from '@/components/pages/home/graphics/graphics-section'
import { InterestsSection } from '@/components/pages/home/interests/interests-section'
import { CtaSection } from '@/components/pages/home/cta-section'

export const Route = createFileRoute('/_layout/')({ component: HomePage })

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
