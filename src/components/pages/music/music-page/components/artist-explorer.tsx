import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { Track } from '@/lib/api'

const HAND_FONT = "'Caveat Variable', cursive"
const CX = 240
const RADIUS = 118
const NODE_R = 20
const SQ_RX = NODE_R * 0.44       // squircle rx for clip (≈22% of side)
const SQ_RX_BORDER = (NODE_R + 2) * 0.44  // squircle rx for border ring

// Angles in standard unit-circle convention: 0°=right, 90°=up, counterclockwise
function getAngles(n: number): number[] {
    switch (n) {
        case 2: return [0, 180]
        case 3: return [90, 210, 330]
        case 4: return [45, 135, 225, 315]
        default: return Array.from({ length: n }, (_, i) => 90 + (i / n) * 360)
    }
}

// Unit-circle angle → SVG coordinates (SVG y-axis is inverted vs math)
function toSVG(deg: number, cy: number): { x: number; y: number } {
    const rad = (deg * Math.PI) / 180
    return {
        x: CX + RADIUS * Math.cos(rad),
        y: cy - RADIUS * Math.sin(rad),
    }
}

// Compute a snug viewBox and vertical center so all nodes fit with consistent padding
function computeLayout(n: number): { viewBox: string; cy: number } {
    if (n <= 1) return { viewBox: '0 0 480 100', cy: 50 }

    const TOP_PAD = NODE_R + 12   // above topmost node
    const BOT_PAD = NODE_R + 28   // below bottommost node + label

    const yOffsets = getAngles(n).map(a => -Math.sin((a * Math.PI) / 180) * RADIUS)
    const minOff = Math.min(...yOffsets) - TOP_PAD
    const maxOff = Math.max(...yOffsets) + BOT_PAD

    const OUTER = 10
    const cy = OUTER - minOff
    const height = Math.ceil(cy + maxOff + OUTER)

    return { viewBox: `0 0 480 ${height}`, cy }
}

// Shared SVG defs — dot grid + rough filter + per-node squircle clip paths
function SvgDefs({ nodes }: { nodes: { x: number; y: number }[] }) {
    return (
        <defs>
            <pattern id="music-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" className="fill-foreground" opacity="0.07" />
            </pattern>
            <filter id="music-rough" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" seed="9" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            {nodes.map((n, i) => (
                <clipPath key={i} id={`mc-${i}`}>
                    <rect x={n.x - NODE_R} y={n.y - NODE_R}
                        width={NODE_R * 2} height={NODE_R * 2}
                        rx={SQ_RX} ry={SQ_RX} />
                </clipPath>
            ))}
        </defs>
    )
}

interface ArtistGraphProps {
    artistName: string
    albums: Track[]
}

function ArtistGraph({ artistName, albums }: ArtistGraphProps) {
    const n = albums.length
    if (n === 0) return null

    const displayName = artistName.length > 20 ? artistName.slice(0, 19) + '…' : artistName

    // ── n=1 : side-by-side (album LEFT, artist name RIGHT) ──────────────────
    if (n === 1) {
        const track = albums[0]
        const albumCX = 160
        const albumCY = 50
        const albumLabel = track.album_name.length > 18
            ? track.album_name.slice(0, 17) + '…'
            : track.album_name

        return (
            <svg viewBox="0 0 480 100" width="100%" style={{ fontFamily: HAND_FONT }}>
                <defs>
                    <pattern id="music-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" className="fill-foreground" opacity="0.07" />
                    </pattern>
                    <filter id="music-rough" x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" seed="9" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                    <clipPath id="mc-0">
                        <rect x={albumCX - NODE_R} y={albumCY - NODE_R}
                            width={NODE_R * 2} height={NODE_R * 2}
                            rx={SQ_RX} ry={SQ_RX} />
                    </clipPath>
                </defs>

                <rect width="100%" height="100%" fill="url(#music-dots)" />

                {/* Connector dash */}
                <line x1={albumCX + NODE_R + 5} y1={albumCY}
                    x2={albumCX + NODE_R + 30} y2={albumCY}
                    className="stroke-foreground/20"
                    strokeWidth="1.5" strokeDasharray="5 4"
                    filter="url(#music-rough)"
                />

                {/* Album squircle */}
                <motion.g
                    style={{ transformOrigin: `${albumCX}px ${albumCY}px`, cursor: 'pointer' }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    onClick={() => window.open(track.external_url, '_blank', 'noopener,noreferrer')}
                >
                    <rect
                        x={albumCX - NODE_R - 2} y={albumCY - NODE_R - 2}
                        width={(NODE_R + 2) * 2} height={(NODE_R + 2) * 2}
                        rx={SQ_RX_BORDER} ry={SQ_RX_BORDER}
                        className="fill-card stroke-foreground/30"
                        strokeWidth="1.5" filter="url(#music-rough)"
                    />
                    <image href={track.album_art_url}
                        x={albumCX - NODE_R} y={albumCY - NODE_R}
                        width={NODE_R * 2} height={NODE_R * 2}
                        clipPath="url(#mc-0)"
                    />
                </motion.g>

                {/* Artist + album label */}
                <text x={albumCX + NODE_R + 38} y={albumCY - 7}
                    textAnchor="start" dominantBaseline="middle"
                    fontSize="16" fontWeight="700"
                    className="fill-foreground"
                    style={{ fontFamily: HAND_FONT }}
                >
                    {displayName}
                </text>
                <text x={albumCX + NODE_R + 38} y={albumCY + 12}
                    textAnchor="start" dominantBaseline="middle"
                    fontSize="12" className="fill-muted-foreground"
                    style={{ fontFamily: HAND_FONT }}
                >
                    {albumLabel}
                </text>
            </svg>
        )
    }

    // ── n≥2 : radial layout ─────────────────────────────────────────────────
    const { viewBox, cy } = computeLayout(n)
    const angles = getAngles(n)
    const nodes = albums.map((track, i) => ({ track, ...toSVG(angles[i], cy) }))

    return (
        <svg viewBox={viewBox} width="100%" aria-label={`${artistName} album graph`} style={{ fontFamily: HAND_FONT }}>
            <SvgDefs nodes={nodes} />

            <rect width="100%" height="100%" fill="url(#music-dots)" />

            {/* Spoke lines — rendered before text so text sits on top */}
            {nodes.map((node, i) => (
                <line key={i}
                    x1={CX} y1={cy} x2={node.x} y2={node.y}
                    className="stroke-foreground/20"
                    strokeWidth="1.5" strokeDasharray="5 4"
                    filter="url(#music-rough)"
                />
            ))}

            {/* Album nodes */}
            {nodes.map((node, i) => {
                const albumLabel = node.track.album_name.length > 14
                    ? node.track.album_name.slice(0, 13) + '…'
                    : node.track.album_name
                return (
                    <motion.g
                        key={node.track.album_art_url}
                        style={{ transformOrigin: `${node.x}px ${node.y}px`, cursor: 'pointer' }}
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                        onClick={() => window.open(node.track.external_url, '_blank', 'noopener,noreferrer')}
                    >
                        <rect
                            x={node.x - NODE_R - 2} y={node.y - NODE_R - 2}
                            width={(NODE_R + 2) * 2} height={(NODE_R + 2) * 2}
                            rx={SQ_RX_BORDER} ry={SQ_RX_BORDER}
                            className="fill-card stroke-foreground/30"
                            strokeWidth="1.5" filter="url(#music-rough)"
                        />
                        <image
                            href={node.track.album_art_url}
                            x={node.x - NODE_R} y={node.y - NODE_R}
                            width={NODE_R * 2} height={NODE_R * 2}
                            clipPath={`url(#mc-${i})`}
                        />
                        <text
                            x={node.x} y={node.y + NODE_R + 14}
                            textAnchor="middle" fontSize="12"
                            className="fill-muted-foreground"
                            style={{ fontFamily: HAND_FONT }}
                        >
                            {albumLabel}
                        </text>
                    </motion.g>
                )
            })}

            {/* Artist name — last so it renders above spoke origins */}
            <text
                x={CX} y={cy}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="15" fontWeight="700"
                className="fill-foreground"
                style={{ fontFamily: HAND_FONT }}
            >
                {displayName}
            </text>
        </svg>
    )
}

export function ArtistExplorer({ tracks }: { tracks: Track[] }) {
    const [selected, setSelected] = useState<string | null>(null)

    const artistAlbumMap = new Map<string, Map<string, Track>>()
    for (const track of tracks) {
        for (const artist of track.artists) {
            if (!artistAlbumMap.has(artist)) artistAlbumMap.set(artist, new Map())
            const albumMap = artistAlbumMap.get(artist)!
            if (!albumMap.has(track.album_art_url)) albumMap.set(track.album_art_url, track)
        }
    }
    const artists = [...artistAlbumMap.keys()].sort(
        (a, b) => artistAlbumMap.get(b)!.size - artistAlbumMap.get(a)!.size,
    )
    const selectedAlbums = selected ? [...artistAlbumMap.get(selected)!.values()] : []

    return (
        <div className="rounded-2xl border border-dashed border-foreground/20 overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-dashed border-foreground/15 bg-muted/20">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-400/70" />
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                    artist-explorer.excalidraw
                </span>
            </div>

            <div className="px-4 pt-4 pb-2">
                <Select value={selected ?? ''} onValueChange={v => setSelected(v || null)}>
                    <SelectTrigger className="w-full sm:w-64 font-mono text-xs h-8" aria-label="Select an artist">
                        <SelectValue placeholder="Select an artist…" />
                    </SelectTrigger>
                    <SelectContent>
                        {artists.map(name => {
                            const count = artistAlbumMap.get(name)!.size
                            return (
                                <SelectItem key={name} value={name} className="font-mono text-xs">
                                    {name}
                                    <span className="ml-1.5 opacity-40">
                                        {count} album{count !== 1 ? 's' : ''}
                                    </span>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </div>

            <AnimatePresence mode="wait">
                {selected ? (
                    <motion.div
                        key={selected}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="px-4 pb-4"
                    >
                        <ArtistGraph artistName={selected} albums={selectedAlbums} />
                    </motion.div>
                ) : (
                    <motion.p
                        key="hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="font-hand text-sm text-muted-foreground/25 text-center py-8"
                    >
                        pick an artist to see their albums
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}
