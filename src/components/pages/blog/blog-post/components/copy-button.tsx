import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
        <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy code'}
            className={cn(
                'font-mono transition-all duration-200',
                copied
                    ? 'text-green-500'
                    : 'text-muted-foreground hover:text-foreground',
                className
            )}
        >
            {copied ? (
                <Check className="size-3.5" />
            ) : (
                <Copy className="size-3.5" />
            )}
            {copied ? 'Copied!' : 'Copy'}
        </Button>
    )
}
