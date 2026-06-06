import 'server-only'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')
const WORDS_PER_MINUTE = 200

export type BlogMeta = {
    title: string
    date: string
    summary: string
    tags?: string[]
    cover?: string
}

export type BlogPost = {
    slug: string
    meta: BlogMeta
    readingTime: number
}

function estimateReadingTime(content: string): number {
    const words = content.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

export async function getAllPosts(): Promise<BlogPost[]> {
    const files = await fs.readdir(CONTENT_DIR)
    const posts = await Promise.all(
        files
            .filter(f => f.endsWith('.mdx'))
            .map(async file => {
                const slug = file.replace(/\.mdx$/, '')
                const raw = await fs.readFile(
                    path.join(CONTENT_DIR, file),
                    'utf-8'
                )
                const { data, content } = matter(raw)
                return {
                    slug,
                    meta: data as BlogMeta,
                    readingTime: estimateReadingTime(content)
                }
            })
    )
    return posts.sort(
        (a, b) =>
            new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    )
}

export async function getPostSource(slug: string): Promise<{ source: string; meta: BlogMeta; readingTime: number } | null> {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
    try {
        const raw = await fs.readFile(filePath, 'utf-8')
        const { data, content } = matter(raw)
        return {
            source: content,
            meta: data as BlogMeta,
            readingTime: estimateReadingTime(content)
        }
    } catch {
        return null
    }
}

