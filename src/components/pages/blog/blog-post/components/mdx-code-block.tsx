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
        return preRef.current?.querySelector('code')?.innerText ?? ''
    }

    return (
        <div
            data-theme={theme}
            className="not-prose border-border my-6 overflow-hidden rounded-xl border bg-[#0d1117] shadow-sm"
        >
            <div className="border-border/50 flex items-center justify-between border-b bg-white/[0.03] px-4 py-2">
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
