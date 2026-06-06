export default function netlifyImageLoader({
    src,
    width,
    quality
}: {
    src: string
    width: number
    quality?: number
}) {
    const params = new URLSearchParams({
        url: src,
        w: String(width),
        q: String(quality ?? 75)
    })
    return `/.netlify/images?${params}`
}
