export type AccentType = 'sky' | 'violet'
export const AccentStyling = {
    sky: {
        label: 'text-sky-500 dark:text-sky-400',
        line: 'border-sky-400/35 dark:border-sky-500/30',
        border: 'border-sky-300/50 dark:border-sky-700/40',
        bg: 'bg-sky-50/30 dark:bg-sky-950/20',
        arrow: 'text-sky-400/70 dark:text-sky-500/60',
        date: 'text-sky-500/50 dark:text-sky-400/40 border-sky-300/30 dark:border-sky-600/30'
    },
    violet: {
        label: 'text-violet-500 dark:text-violet-400',
        line: 'border-violet-400/35 dark:border-violet-500/30',
        border: 'border-violet-300/50 dark:border-violet-700/40',
        bg: 'bg-violet-50/30 dark:bg-violet-950/20',
        arrow: 'text-violet-400/70 dark:text-violet-500/60',
        date: 'text-violet-500/50 dark:text-violet-400/40 border-violet-300/30 dark:border-violet-600/30'
    }
} as const
