import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

const COUNT = 2500

const PALETTE = [
    new THREE.Color('#4f86f7'), // primary blue
    new THREE.Color('#818cf8'), // indigo-400
    new THREE.Color('#60a5fa'), // sky-400
    new THREE.Color('#4fb8b2') // teal accent
]

export function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null)
    const { pointer } = useThree()

    const { positions, colors, velocities } = useMemo(() => {
        const positions = new Float32Array(COUNT * 3)
        const colors = new Float32Array(COUNT * 3)
        const velocities = new Float32Array(COUNT * 2)

        for (let i = 0; i < COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 18
            positions[i * 3 + 1] = (Math.random() - 0.5) * 11
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4

            const c = PALETTE[Math.floor(Math.random() * PALETTE.length)]!
            colors[i * 3] = c.r
            colors[i * 3 + 1] = c.g
            colors[i * 3 + 2] = c.b

            velocities[i * 2] = (Math.random() - 0.5) * 0.0015
            velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.0015
        }

        return { positions, colors, velocities }
    }, [])

    const posAttr = useMemo(
        () => new THREE.BufferAttribute(positions, 3),
        [positions]
    )
    const colorAttr = useMemo(
        () => new THREE.BufferAttribute(colors, 3),
        [colors]
    )

    const elapsedRef = useRef(0)

    useFrame((_, delta) => {
        if (!pointsRef.current) return
        elapsedRef.current += delta
        const t = elapsedRef.current
        const pos = posAttr.array as Float32Array

        const mx = pointer.x * 9
        const my = pointer.y * 5.5
        const repelR = 2.2

        for (let i = 0; i < COUNT; i++) {
            const ix = i * 3
            const iy = ix + 1
            const ivx = i * 2
            const ivy = ivx + 1

            pos[ix] += velocities[ivx]!
            pos[iy] += velocities[ivy]!

            pos[ix] += Math.sin(t * 0.14 + pos[iy]! * 0.35) * 0.0007
            pos[iy] += Math.cos(t * 0.11 + pos[ix]! * 0.28) * 0.0007

            const dx = pos[ix]! - mx
            const dy = pos[iy]! - my
            const distSq = dx * dx + dy * dy
            if (distSq < repelR * repelR && distSq > 0.0001) {
                const dist = Math.sqrt(distSq)
                const force = ((repelR - dist) / repelR) * 0.05
                pos[ix] += (dx / dist) * force
                pos[iy] += (dy / dist) * force
            }

            if (pos[ix]! > 10) pos[ix] = -10
            else if (pos[ix]! < -10) pos[ix] = 10
            if (pos[iy]! > 6.5) pos[iy] = -6.5
            else if (pos[iy]! < -6.5) pos[iy] = 6.5
        }

        posAttr.needsUpdate = true
        pointsRef.current.rotation.y = t * 0.012
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <primitive object={posAttr} attach="attributes-position" />
                <primitive object={colorAttr} attach="attributes-color" />
            </bufferGeometry>
            <pointsMaterial
                vertexColors
                size={0.04}
                transparent
                opacity={0.85}
                sizeAttenuation
            />
        </points>
    )
}
