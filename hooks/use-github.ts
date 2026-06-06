import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function useGitHubStats() {
    return useQuery({
        queryKey: ['github', 'stats'],
        queryFn: () => api.github.stats(),
        staleTime: 60 * 60 * 1000
    })
}

export function useGitHubRepos() {
    return useQuery({
        queryKey: ['github', 'repos'],
        queryFn: () => api.github.repos(),
        staleTime: 30 * 60 * 1000
    })
}
