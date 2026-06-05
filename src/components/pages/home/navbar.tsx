import { Link } from '@tanstack/react-router'
import { GhibliIcon } from '@/components/icons/ghibli'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { MobileNav } from '@/components/pages/home/mobile-nav'
import { SITE } from '@/content/site'

export function Navbar() {
    return (
        <header className="z-50 sticky inset-0 bg-background/80 backdrop-blur-2xl border-b border-foreground/8">
            <div className="flex justify-between items-center gap-4 mx-auto px-4 sm:px-6 md:px-8 max-w-5xl h-14">
                {/* Logo — squircle with blue background */}
                <Link
                    to="/"
                    className="flex size-9 shrink-0 items-center justify-center rounded-[22%] bg-sky-400 hover:bg-sky-500 transition-colors"
                >
                    <GhibliIcon className="size-6" />
                </Link>

                {/* Desktop links */}
                <nav className="hidden md:flex items-center gap-1 flex-1">
                    {SITE.nav.links.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                'relative px-3 py-1.5 rounded-md',
                                'font-hand font-bold text-lg',
                                'text-muted-foreground/70 transition-colors hover:text-foreground hover:bg-accent/40',
                                'after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-px',
                                'after:bg-foreground/50 after:scale-x-0 after:origin-left after:transition-transform',
                                'data-[status=active]:text-foreground data-[status=active]:after:scale-x-100',
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Theme toggle + mobile hamburger */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <div className="md:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    )
}
