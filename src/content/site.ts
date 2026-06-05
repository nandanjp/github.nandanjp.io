/**
 * Single source of truth for all human-readable text on the site.
 * Edit here; components import from this file.
 */
export const SITE = {
    // ── Identity ────────────────────────────────────────────────────────────
    identity: {
        name:        'Nandan Patel',
        email:       'nandan.jp17@gmail.com',
        github:      'nandanjp',
        githubUrl:   'https://github.com/nandanjp',
        twitterUrl:  null as string | null,
    },

    // ── Navigation ──────────────────────────────────────────────────────────
    nav: {
        links: [
            { path: '/blog',     label: 'Blog' },
            { path: '/projects', label: 'Projects' },
            { path: '/photos',   label: 'Photos' },
            { path: '/music',    label: 'Music' },
            { path: '/work',     label: 'Work' },
        ] as { path: string; label: string }[],
    },

    // ── Homepage ─────────────────────────────────────────────────────────────
    home: {
        hero: {
            label:      '[01] — intro',
            heading:    'Nandan\nPatel.',
            status:     'available for work',
            tagline:    'Software engineer building fast systems, elegant UIs, and open-source tools.',
            building:   { project1: 'personal-api', project2: 'this site' },
            cta:        { primary: 'View Projects', secondary: 'Read Blog' },
        },

        about: {
            label:   '[02] — about',
            heading: 'Systems thinker,\nfrontend builder.',
            body: [
                'I build backend infrastructure and developer tools by day, and explore web graphics and UI engineering by night. Currently deep in Kubernetes, distributed systems, and making things go really fast.',
                "When I'm not writing code, I'm playing guitar, watching anime, or hunting for the best bowl of ramen in the city.",
            ],
            stackLabel:     'tech stack',
            languagesLabel: 'Languages',
            toolsLabel:     'Tools',
        },

        architecture: {
            label:    '[03] — architecture',
            heading:  'Homelab Systems Design',
            body:     'A 3-node Raspberry Pi k8s cluster at home. Every service — API, cache, object store, database — running on bare metal.',
            filename: 'systems-design.excalidraw',
            clusterLabel: 'k8s cluster · homelab',
            deploymentsLabel: 'live deployments',
            deployedApps: [
                { emoji: '🌐', name: 'Personal Site',  url: 'nandan-hl.dev' },
                { emoji: '🖼️', name: 'Image Gallery',  url: 'photos.nandan-hl.dev' },
                { emoji: '🎬', name: 'Media Catalog',  url: 'sadge-list.nandan-hl.dev' },
            ],
        },

        graphics: {
            label:    '[04] — graphics & games',
            heading:  'Graphics, games,\nand the GPU.',
            filename: 'pokemon-player-room.glb',
            body: [
                "I'm drawn to the intersection of math and visual art — WebGL, Three.js, shader programming, and the craft of making GPUs draw beautiful things in real time.",
                "Games were my first window into software. Pokémon specifically lit the spark — the combination of systems design, real-time rendering, and infinite replayability is still what I chase in everything I build.",
            ],
        },

        interests: {
            label:    '[05] — beyond code',
            heading:  'Life beyond\nthe terminal.',
            sub:      'Engineering is what I do — curiosity is who I am.',
            filename: 'beyond-code.sh',
            entries: [
                { cmd: 'powerlifting', color: '#f87171', type: 'text'      as const, text: 'Competing in raw powerlifting. Bench · Squat · Deadlift.' },
                { cmd: 'sports',       color: '#4ade80', type: 'text'      as const, text: 'Basketball, badminton, cricket — always up for a game.' },
                { cmd: 'traveling',    color: '#60a5fa', type: 'text'      as const, text: 'New cities, new food, new perspectives. Always planning the next trip.' },
                { cmd: 'languages',    color: '#c084fc', type: 'languages' as const },
                { cmd: 'watching',     color: '#fbbf24', type: 'text'      as const, text: 'Anime, films, and shows. Always mid-series on something good.' },
                { cmd: 'music',        color: '#f472b6', type: 'music'     as const },
            ],
            languages: [
                { label: 'English', level: 'native' },
                { label: '日本語',   level: '少し',   note: '(a little)' },
                { label: '中文',     level: '一点点', note: '(a tiny bit)' },
            ],
            musicLink: 'see /music →',
        },

        cta: {
            label:   '[06] — say hello',
            heading: "Let's build something\ntogether.",
        },
    },

    // ── Work / Resume ────────────────────────────────────────────────────────
    work: {
        label:    '[work] — experience & projects',
        heading:  "Where I've Been.",
        sub:      'Work history and projects. Filling in shortly.',
        filename: 'resume.excalidraw',
        resumeName: 'Nandan Patel',
        resumeBio:  '21 · University of Waterloo',
        experienceLabel: 'Work Experience',
        projectsLabel:   'Projects',
        entries: [
            { company: 'Company A', role: 'Software Engineer',        period: '2024 – present', rotate: -0.6 },
            { company: 'Company B', role: 'Software Engineer Intern', period: '2023 – 2024',    rotate:  0.5 },
            { company: 'Company C', role: 'Software Engineer Intern', period: '2022 – 2023',    rotate: -0.3 },
        ],
        projects: [
            { name: 'Project Alpha', tech: 'Go · TypeScript · Kubernetes', rotate:  0.6 },
            { name: 'Project Beta',  tech: 'React · PostgreSQL · Redis',   rotate: -0.5 },
        ],
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
        tagline: 'Building fast systems and elegant UIs.',
    },

    // ── Empty / error states ─────────────────────────────────────────────────
    empty: {
        photos:   { heading: 'No photos yet',    sub: 'Check back soon.' },
        music:    { heading: 'No tracks yet',     sub: 'Check back soon.' },
        projects: { heading: 'No repos found',    sub: 'Check back soon.' },
        blog:     { heading: 'Post not found',    sub: 'The post you\'re looking for doesn\'t exist.' },
    },
} as const
