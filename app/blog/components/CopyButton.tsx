'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
    getText: () => string
    className?: string
}

export function CopyButton({ getText, className }: CopyButtonProps) {
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        const text = getText()
        if (!text) return

        let success = false

        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(text)
                success = true
            } catch {}
        }

        if (!success) {
            try {
                const el = document.createElement('textarea')
                el.value = text
                el.style.cssText = 'position:fixed;left:-9999px;opacity:0'
                document.body.appendChild(el)
                el.focus()
                el.select()
                success = !!document.execCommand('copy')
                document.body.removeChild(el)
            } catch {}
        }

        if (success) {
            setCopied(true)
            setOpen(true)
            setTimeout(() => {
                setCopied(false)
                setOpen(false)
            }, 2000)
        }
    }

    return (
        <Tooltip
            open={open}
            onOpenChange={(next) => {
                if (!copied) setOpen(next)
            }}
        >
            <TooltipTrigger
                onClick={handleCopy}
                aria-label={copied ? 'Copied' : 'Copy code'}
                className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'relative size-7 text-black/30 hover:bg-black/5 hover:text-black/60 dark:text-white/35 dark:hover:bg-white/5 dark:hover:text-white/70',
                    className
                )}
            >
                <span
                    className={cn(
                        'pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-200',
                        copied ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                    )}
                >
                    <Check className="size-3.5 text-green-400" />
                </span>
                <span
                    className={cn(
                        'flex items-center justify-center transition-all duration-200',
                        copied ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
                    )}
                >
                    <Copy className="size-3.5" />
                </span>
            </TooltipTrigger>
            <TooltipContent side="top">
                {copied ? 'Copied!' : 'Copy'}
            </TooltipContent>
        </Tooltip>
    )
}
