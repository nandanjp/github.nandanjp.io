import { useRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { CopyButton } from './copy-button'

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
        return preRef.current?.querySelector('code')?.innerText ?? ''
    }

    return (
        <div
            data-theme={theme}
            className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-[#0d1117] shadow-sm"
        >
            <div className="flex items-center justify-between border-b border-border/50 bg-white/[0.03] px-4 py-2">
                <span className="font-mono text-[11px] text-muted-foreground/70 uppercase tracking-wider">
                    {language ?? 'code'}
                </span>
                <CopyButton getText={getCode} />
            </div>
            <pre
                ref={preRef}
                data-language={language}
                data-theme={theme}
                className={cn(
                    'overflow-x-auto p-5 text-[13px] leading-relaxed',
                    className
                )}
                {...props}
            >
                {children}
            </pre>
        </div>
    )
}
