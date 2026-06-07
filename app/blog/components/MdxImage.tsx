import { BlurImage } from '@/components/ui/blur-image'
import { MonoText } from '@/components/ui/typography'

interface MdxImageProps {
    src?: string
    alt?: string
    className?: string
}

export function MdxImage({ src, alt }: MdxImageProps) {
    if (!src) return null

    return (
        <figure className="not-prose my-8">
            <div className="border-border bg-muted relative overflow-hidden rounded-xl border">
                <BlurImage
                    src={src}
                    alt={alt ?? ''}
                    width={800}
                    height={450}
                    className="block w-full object-cover"
                    loading="lazy"
                />
            </div>
            {alt && (
                <figcaption className="mt-2.5 text-center">
                    <MonoText>{alt}</MonoText>
                </figcaption>
            )}
        </figure>
    )
}
