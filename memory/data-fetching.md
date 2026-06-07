---
name: data-fetching
description: Async server component pattern + ISR for pages that fetch from personal-api
metadata:
  type: project
---

## Pattern

Pages that fetch from the personal API (`personal-api.nandan-hl.dev`) use this pattern:

```tsx
export const revalidate = 3600  // ISR — static + background revalidation every hour

export default function SomePage() {
    return (
        <div>
            <section>...heading...</section>
            <Suspense fallback={<SomeSkeleton />}>
                <SomeData />
            </Suspense>
        </div>
    )
}

// Async server component — fetch runs at build time and on revalidation
async function SomeData() {
    const result = await Promise.allSettled([api.something()])
    const data = result[0].status === 'fulfilled' ? result[0].value : []
    return <SomeContent data={data} />
}
```

## Applied to

- `app/photos/page.tsx` → `PhotosData` async component
- `app/projects/page.tsx` → `ProjectsData` async component
- `app/music/page.tsx` → `MusicData` async component

## Why this structure

The original bug: data was fetched at the top-level page component (`await` before `return`). With `revalidate = 3600`, Next.js statically generated the whole page at build time. If the API was down, empty arrays got baked in and cached for an hour.

The fix: move the fetch into an async server component inside `<Suspense>`. The page shell is static; the data component fetches at build time with `Promise.allSettled` so failures produce an empty-state page rather than a build error. ISR revalidation means the first real visitor request recovers the page automatically.

## Do NOT use `force-dynamic`

`force-dynamic` prevents static generation entirely — every request spins up a Netlify serverless function, adding TTFB latency and cold-start cost. ISR with `revalidate = 3600` is better: pages are served from Netlify's CDN edge and only revalidated in the background every hour.

## API fetch caching

`lib/api.ts` passes `{ next: { revalidate: 3600 } }` to every fetch call so Next.js's data cache holds API responses for an hour, independent of the page-level revalidation.
