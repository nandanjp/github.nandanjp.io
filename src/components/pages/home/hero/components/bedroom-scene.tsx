import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, OrbitControls, useGLTF } from '@react-three/drei'

function BedroomModel() {
    const { scene } = useGLTF('/models/bedroom.glb')
    const clone = useMemo(() => scene.clone(), [scene])
    return (
        <Center>
            <primitive object={clone} dispose={null} />
        </Center>
    )
}

export function BedroomScene() {
    return (
        <Canvas
            frameloop="demand"
            camera={{ position: [3, 2, 5], fov: 45 }}
            gl={{
                alpha: true,
                antialias: false,
                powerPreference: 'high-performance'
            }}
            dpr={[0.8, 1]}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[4, 6, 4]} intensity={1.2} />

                <BedroomModel />
                <OrbitControls
                    enableZoom
                    enablePan={false}
                    enableDamping
                    dampingFactor={0.06}
                    minDistance={2}
                    maxDistance={10}
                    minPolarAngle={Math.PI / 8}
                    maxPolarAngle={Math.PI / 2}
                />
            </Suspense>
        </Canvas>
    )
}
