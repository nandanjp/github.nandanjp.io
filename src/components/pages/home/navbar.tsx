import { Link } from '@tanstack/react-router'
import { GhibliIcon } from '@/components/icons/ghibli'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { MobileNav } from '@/components/pages/home/mobile-nav'
import { SITE } from '@/content/site'

export function Navbar() {
    return (
        <header className="bg-background/80 border-foreground/8 sticky inset-0 z-50 border-b backdrop-blur-2xl">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
                {/* Logo — squircle with blue background */}
                <Link
                    to="/"
                    aria-label="Home"
                    className="flex size-9 shrink-0 items-center justify-center rounded-[22%] bg-sky-400 transition-colors hover:bg-sky-500"
                >
                    <GhibliIcon className="size-6" />
                </Link>

                {/* Desktop links */}
                <nav className="hidden flex-1 items-center gap-1 md:flex">
                    {SITE.nav.links.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                'relative rounded-md px-3 py-1.5',
                                'font-hand text-lg font-bold',
                                'text-muted-foreground/70 hover:text-foreground hover:bg-accent/40 transition-colors',
                                'after:absolute after:right-3 after:bottom-0.5 after:left-3 after:h-px',
                                'after:bg-foreground/50 after:origin-left after:scale-x-0 after:transition-transform',
                                'data-[status=active]:text-foreground data-[status=active]:after:scale-x-100'
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
