import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
    getText: () => string
    className?: string
}

export function CopyButton({ getText, className }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    function handleCopy() {
        const text = getText()
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <button
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy code'}
            className={cn(
                'flex items-center gap-1.5 rounded px-2 py-1 text-xs transition-all duration-200',
                copied
                    ? 'text-green-500'
                    : 'text-muted-foreground hover:bg-background/60 hover:text-foreground',
                className
            )}
        >
            {copied ? (
                <Check className="size-3.5" />
            ) : (
                <Copy className="size-3.5" />
            )}
            <span className="font-mono">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
    )
}
