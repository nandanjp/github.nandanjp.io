import { createFileRoute } from '@tanstack/react-router'
import { BlogPost } from '@/components/pages/blog/blog-post/blog-post'

export const Route = createFileRoute('/_layout/blog_/$blogId')({ component: BlogPostRoute })

function BlogPostRoute() {
    const { blogId } = Route.useParams()
    return (
        <div className="mx-auto w-full max-w-2xl px-6 py-12">
            <BlogPost slug={blogId} />
        </div>
    )
}
