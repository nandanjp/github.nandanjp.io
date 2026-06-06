import { TooltipProvider } from '@/components/ui/tooltip'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <TooltipProvider>{children}</TooltipProvider>
}
