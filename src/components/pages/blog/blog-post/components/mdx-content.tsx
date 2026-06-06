import { mdxComponents } from './mdx-components'
import type { ComponentType } from 'react'

interface MdxContentProps {
    component: ComponentType<{ components?: Record<string, ComponentType> }>
}

export function MdxContent({ component: Component }: MdxContentProps) {
    return (
        <article className="prose prose-neutral dark:prose-invert prose-headings:font-mono prose-a:no-underline prose-pre:my-0 prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0 prose-pre:rounded-none prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:bg-transparent prose-code:p-0 prose-img:rounded-xl prose-img:my-0 [&_.not-prose]:not-prose max-w-none">
            <Component
                components={mdxComponents as Record<string, ComponentType>}
            />
        </article>
    )
}
