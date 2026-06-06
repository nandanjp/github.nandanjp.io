import { AccentStyling, type AccentType } from '../shared/styles-config'
import { BodyText } from '@/components/ui/typography'

interface EntryBulletsProps {
    bullets: readonly string[]
    accentType: AccentType
}

export function EntryBullets({ bullets, accentType }: EntryBulletsProps) {
    const accent = AccentStyling[accentType]
    return (
        <div className="mt-3 flex flex-col gap-2">
            {bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5">
                    <span
                        className={`font-hand mt-px shrink-0 text-base select-none ${accent.arrow}`}
                    >
                        ↳
                    </span>
                    <BodyText className="font-hand leading-snug">{b}</BodyText>
                </div>
            ))}
        </div>
    )
}
