import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostSource } from '@/lib/blog'
import { BlogPost } from '../components/BlogPost'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await getPostSource(slug)
    if (!post) return {}
    return {
        title: `${post.meta.title} — Nandan Patel`,
        description: post.meta.summary
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = await getPostSource(slug)
    if (!post) notFound()

    return (
        <div className="mx-auto w-full max-w-2xl px-6 py-12">
            <BlogPost source={post.source} meta={post.meta} />
        </div>
    )
}
