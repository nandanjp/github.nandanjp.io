import { TrackCard } from './TrackCard'
import type { Track } from '@/lib/api'

interface TrackGridProps {
    tracks: Track[]
    startIndex: number
}

export function TrackGrid({ tracks, startIndex }: TrackGridProps) {
    return (
        <div className="flex flex-col gap-3">
            {tracks.map((track, i) => (
                <TrackCard key={track.id} track={track} index={startIndex + i} />
            ))}
        </div>
    )
}
