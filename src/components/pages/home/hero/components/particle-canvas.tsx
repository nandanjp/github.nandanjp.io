import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ParticleField } from './components/particle-field'

export function ParticleCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 60 }}
            gl={{ alpha: true, antialias: false }}
            dpr={[1, 1.5]}
        >
            <Suspense fallback={null}>
                <ParticleField />
            </Suspense>
        </Canvas>
    )
}
