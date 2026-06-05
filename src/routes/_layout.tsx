import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { PageLayout } from '@/components/layout/page-layout'

export const Route = createFileRoute('/_layout')({ component: LayoutRoute })

function LayoutRoute() {
    const { pathname } = useLocation()
    return (
        <PageLayout>
            <AnimatePresence initial={false}>
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    style={{ display: 'contents' }}
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
        </PageLayout>
    )
}
