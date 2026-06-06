import { HeroSection } from './_home/HeroSection'
import { AboutSection } from './_home/AboutSection'
import { ArchitectureSection } from './_home/ArchitectureSection'
import { GraphicsSection } from './_home/GraphicsSection'
import { InterestsSection } from './_home/InterestsSection'
import { CtaSection } from './_home/CtaSection'

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ArchitectureSection />
            <GraphicsSection />
            <InterestsSection />
            <CtaSection />
        </>
    )
}
