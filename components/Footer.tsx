import Link from 'next/link'
import { Mail } from 'lucide-react'
import { Icon } from '@/components/Icon'
import { SITE } from '@/content/site'

export function Footer() {
    return (
        <footer className="bg-background/80 mt-auto border-t">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-8">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                    {/* Brand */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2.5">
                            <Icon.Ghibli className="text-primary size-6" />
                            <span className="font-semibold tracking-tight">
                                {SITE.identity.name}
                            </span>
                        </div>
                        <p className="text-muted-foreground whitespace-nowrap text-xs">
                            {SITE.footer.tagline}
                        </p>
                    </div>

                    {/* Nav + Socials */}
                    <div className="flex flex-col gap-4 sm:items-end">
                        <nav className="flex flex-wrap gap-x-5 gap-y-1.5">
                            {SITE.nav.links.map(link => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex items-center gap-3">
                            {SITE.identity.githubUrl && (
                                <a
                                    href={SITE.identity.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Icon.GitHub className="size-4" />
                                </a>
                            )}
                            <a
                                href={`mailto:${SITE.identity.email}`}
                                aria-label="Email"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Mail className="size-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
