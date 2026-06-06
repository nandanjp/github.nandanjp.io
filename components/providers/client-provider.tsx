import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

let queryClient: QueryClient | undefined

export function getQueryClient() {
    if (queryClient) return queryClient
    queryClient = new QueryClient()
    return queryClient
}

export default function TanStackQueryProvider({
    children
}: {
    children: ReactNode
}) {
    return (
        <QueryClientProvider client={getQueryClient()}>
            {children}
        </QueryClientProvider>
    )
}
