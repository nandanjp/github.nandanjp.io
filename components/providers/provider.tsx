'use client'

import TanStackQueryProvider from './client-provider'

export default function Provider({ children }: React.PropsWithChildren) {
    return <TanStackQueryProvider>{children}</TanStackQueryProvider>
}
