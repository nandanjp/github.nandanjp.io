import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function useMusic() {
    return useQuery({
        queryKey: ['music'],
        queryFn: () => api.music.list(),
        staleTime: 60 * 60 * 1000
    })
}
