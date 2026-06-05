import type { ComponentType } from 'react'

export type BlogMeta = {
    title: string
    date: string
    summary: string
    tags?: string[]
    cover?: string
}

export type BlogModule = {
    default: ComponentType<{ components?: Record<string, ComponentType> }>
    meta: BlogMeta
}

const contentModules = import.meta.glob<BlogModule>(
    '../content/blog/*.mdx',
    { eager: true }
)

const sampleModules = import.meta.glob<BlogModule>(
    '../../sample-data/blog/*.mdx',
    { eager: true }
)

function pathToSlug(path: string): string {
    return path.split('/').pop()!.replace(/\.mdx$/, '')
}

const allModules: Record<string, BlogModule> = {
    ...Object.fromEntries(
        Object.entries(contentModules).map(([path, mod]) => [
            pathToSlug(path),
            mod
        ])
    ),
    ...Object.fromEntries(
        Object.entries(sampleModules).map(([path, mod]) => [
            pathToSlug(path),
            mod
        ])
    )
}

export type BlogPost = {
    slug: string
    meta: BlogMeta
    readingTime: number
}

function estimateReadingTime(mod: BlogModule): number {
    // Render to string is not available at this layer; estimate from summary length
    // as a rough proxy. A real implementation would parse MDX source word count.
    const words = (mod.meta.summary ?? '').split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200) + 2)
}

export function getAllPosts(): BlogPost[] {
    return Object.entries(allModules)
        .map(([slug, mod]) => ({ slug, meta: mod.meta, readingTime: estimateReadingTime(mod) }))
        .sort(
            (a, b) =>
                new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
        )
}

export function getPost(slug: string): BlogModule | undefined {
    return allModules[slug]
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
