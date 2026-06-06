import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function usePhotos() {
    return useQuery({
        queryKey: ['photos'],
        queryFn: () => api.photos.list(),
        staleTime: 5 * 60 * 1000
    })
}
