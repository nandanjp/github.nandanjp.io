import type { Metadata } from 'next'
import { SITE } from '@/content/site'
import { PageHeading, SectionLabel, BodyText } from '@/components/ui/typography'
import { WorkContent } from './components/WorkContent'

export const metadata: Metadata = {
    title: 'Work — Nandan Patel',
    description: 'Work experience and projects.'
}

export default function WorkPage() {
    return (
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">{SITE.work.label}</SectionLabel>
                <PageHeading className="mb-3">{SITE.work.heading}</PageHeading>
                <BodyText>{SITE.work.sub}</BodyText>
            </section>
            <div className="pb-16">
                <WorkContent />
            </div>
        </div>
    )
}
