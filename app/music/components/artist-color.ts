const ARTIST_COLORS = [
    {
        bg: 'bg-sky-100 dark:bg-sky-950/60',
        activeBg: 'bg-sky-300/60 dark:bg-sky-700/50',
        text: 'text-sky-700 dark:text-sky-300',
        bar: 'bg-sky-400',
        dot: 'bg-sky-400'
    },
    {
        bg: 'bg-violet-100 dark:bg-violet-950/60',
        activeBg: 'bg-violet-300/60 dark:bg-violet-700/50',
        text: 'text-violet-700 dark:text-violet-300',
        bar: 'bg-violet-400',
        dot: 'bg-violet-400'
    },
    {
        bg: 'bg-emerald-100 dark:bg-emerald-950/60',
        activeBg: 'bg-emerald-300/60 dark:bg-emerald-700/50',
        text: 'text-emerald-700 dark:text-emerald-300',
        bar: 'bg-emerald-400',
        dot: 'bg-emerald-400'
    },
    {
        bg: 'bg-rose-100 dark:bg-rose-950/60',
        activeBg: 'bg-rose-300/60 dark:bg-rose-700/50',
        text: 'text-rose-700 dark:text-rose-300',
        bar: 'bg-rose-400',
        dot: 'bg-rose-400'
    },
    {
        bg: 'bg-amber-100 dark:bg-amber-950/60',
        activeBg: 'bg-amber-300/60 dark:bg-amber-700/50',
        text: 'text-amber-700 dark:text-amber-300',
        bar: 'bg-amber-400',
        dot: 'bg-amber-400'
    },
    {
        bg: 'bg-teal-100 dark:bg-teal-950/60',
        activeBg: 'bg-teal-300/60 dark:bg-teal-700/50',
        text: 'text-teal-700 dark:text-teal-300',
        bar: 'bg-teal-400',
        dot: 'bg-teal-400'
    },
    {
        bg: 'bg-fuchsia-100 dark:bg-fuchsia-950/60',
        activeBg: 'bg-fuchsia-300/60 dark:bg-fuchsia-700/50',
        text: 'text-fuchsia-700 dark:text-fuchsia-300',
        bar: 'bg-fuchsia-400',
        dot: 'bg-fuchsia-400'
    },
    {
        bg: 'bg-orange-100 dark:bg-orange-950/60',
        activeBg: 'bg-orange-300/60 dark:bg-orange-700/50',
        text: 'text-orange-700 dark:text-orange-300',
        bar: 'bg-orange-400',
        dot: 'bg-orange-400'
    }
] as const

export type ArtistColor = (typeof ARTIST_COLORS)[number]

function hashStr(name: string): number {
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
    return hash % ARTIST_COLORS.length
}

export function getArtistColor(name: string): ArtistColor {
    return ARTIST_COLORS[hashStr(name)]
}
