import type { Track } from '@/lib/api'
import { TrackCard } from './track-card'

interface TrackGridProps {
    tracks: Track[]
    startIndex: number
    playingId: string | null
    progress: number
    onPlay: (track: Track) => void
    onStop: () => void
}

export function TrackGrid({ tracks, startIndex, playingId, progress, onPlay, onStop }: TrackGridProps) {
    return (
        <div className="flex flex-col gap-3">
            {tracks.map((track, i) => (
                <TrackCard
                    key={track.id}
                    track={track}
                    index={startIndex + i}
                    isPlaying={playingId === track.id}
                    progress={playingId === track.id ? progress : 0}
                    onPlay={onPlay}
                    onStop={onStop}
                />
            ))}
        </div>
    )
}
