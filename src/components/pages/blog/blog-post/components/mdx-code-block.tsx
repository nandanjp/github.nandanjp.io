import { useRef } from 'react'
import { CopyButton } from './copy-button'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

interface MdxCodeBlockProps extends ComponentPropsWithoutRef<'pre'> {
    'data-language'?: string
    'data-theme'?: string
}

export function MdxCodeBlock({
    className,
    children,
    'data-language': language,
    'data-theme': theme,
    ...props
}: MdxCodeBlockProps) {
    const preRef = useRef<HTMLPreElement>(null)

    function getCode() {
        if (!preRef.current) return ''
        const lines = preRef.current.querySelectorAll('[data-line], .line')
        if (lines.length > 0) {
            return Array.from(lines)
                .map(l => l.textContent ?? '')
                .join('\n')
        }
        const code = preRef.current.querySelector('code')
        return code?.innerText ?? preRef.current.innerText ?? ''
    }

    return (
        <div
            data-theme={theme}
            className="not-prose border-border my-6 rounded-xl border bg-[#f6f8fa] shadow-sm dark:bg-[#0d1117]"
        >
            <div className="border-border/50 relative flex items-center justify-between border-b bg-black/5 px-4 py-2 dark:bg-white/3">
                <span className="text-muted-foreground/70 font-mono text-xs tracking-wider uppercase">
                    {language ?? 'code'}
                </span>
                <CopyButton getText={getCode} />
            </div>
            <pre
                ref={preRef}
                data-language={language}
                data-theme={theme}
                className={cn(
                    'overflow-x-auto py-5 pl-5 [&>code]:block [&>code]:min-w-max [&>code]:pr-5 text-[13px] leading-relaxed',
                    className
                )}
                {...props}
            >
                {children}
            </pre>
        </div>
    )
}
