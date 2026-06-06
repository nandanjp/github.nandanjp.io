import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from './api'

const mockFetch = vi.fn()

beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
})

afterEach(() => {
    vi.unstubAllGlobals()
})

function okResponse(body: unknown) {
    return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(body)
    } as Response)
}

function errResponse(status: number) {
    return Promise.resolve({ ok: false, status } as Response)
}

describe('api.photos.list', () => {
    it('returns photos on success', async () => {
        const payload = {
            photos: [
                { key: 'a.jpg', url: 'https://example.com/a.jpg', size: 1000 }
            ]
        }
        mockFetch.mockReturnValueOnce(okResponse(payload))
        const result = await api.photos.list()
        expect(result).toEqual(payload)
    })

    it('throws on non-ok response', async () => {
        mockFetch.mockReturnValueOnce(errResponse(500))
        await expect(api.photos.list()).rejects.toThrow('personal-api 500')
    })
})

describe('api.music.list', () => {
    it('returns tracks on success', async () => {
        const payload = { tracks: [] }
        mockFetch.mockReturnValueOnce(okResponse(payload))
        const result = await api.music.list()
        expect(result).toEqual(payload)
    })
})

describe('api.github.stats', () => {
    it('returns stats on success', async () => {
        const payload = {
            username: 'nandanjp',
            name: 'Nandan Patel',
            bio: null,
            avatar_url: 'https://github.com/nandanjp.png',
            followers: 10,
            following: 5,
            public_repos: 20,
            total_stars: 50,
            languages: []
        }
        mockFetch.mockReturnValueOnce(okResponse(payload))
        const result = await api.github.stats()
        expect(result.username).toBe('nandanjp')
    })
})
