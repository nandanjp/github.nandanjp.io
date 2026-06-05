import { describe, it, expect } from 'vitest'
import { formatDuration, formatCompactNumber } from './utils'

describe('formatDuration', () => {
    it('formats sub-minute durations', () => {
        expect(formatDuration(30_000)).toBe('0:30')
    })

    it('pads seconds with leading zero', () => {
        expect(formatDuration(65_000)).toBe('1:05')
    })

    it('formats multi-minute durations', () => {
        expect(formatDuration(3_661_000)).toBe('61:01')
    })

    it('handles zero', () => {
        expect(formatDuration(0)).toBe('0:00')
    })
})

describe('formatCompactNumber', () => {
    it('formats numbers below 1k as-is', () => {
        expect(formatCompactNumber(42)).toBe('42')
        expect(formatCompactNumber(999)).toBe('999')
    })

    it('formats thousands with k suffix', () => {
        expect(formatCompactNumber(1_200)).toBe('1.2k')
        expect(formatCompactNumber(10_000)).toBe('10.0k')
    })

    it('formats millions with M suffix', () => {
        expect(formatCompactNumber(1_500_000)).toBe('1.5M')
    })
})
