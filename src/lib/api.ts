const API_BASE =
    (import.meta.env['VITE_PERSONAL_API_URL'] as string | undefined) ??
    'https://personal-api.nandan-hl.dev'

export type Photo = {
    key: string
    url: string
    size: number
}

export type Track = {
    id: string
    name: string
    artists: string[]
    album_name: string
    album_art_url: string
    duration_ms: number
    preview_url: string | null
    external_url: string
    popularity: number
}

export type GitHubStats = {
    username: string
    name: string
    bio: string | null
    avatar_url: string
    followers: number
    following: number
    public_repos: number
    total_stars: number
    languages: { name: string; count: number }[]
}

export type GitHubRepo = {
    name: string
    full_name: string
    description: string | null
    url: string
    stars: number
    forks: number
    language: string | null
    topics: string[]
    open_issues: number
    updated_at: string
}

async function apiFetch<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`)
    if (!res.ok) throw new Error(`personal-api ${res.status}: ${path}`)
    return res.json() as Promise<T>
}

export const api = {
    photos: {
        list: () => apiFetch<{ photos: Photo[] }>('/photos')
    },
    music: {
        list: () => apiFetch<{ tracks: Track[] }>('/music')
    },
    github: {
        stats: () => apiFetch<GitHubStats>('/github/stats'),
        repos: () => apiFetch<{ repos: GitHubRepo[] }>('/github/repos')
    }
}
