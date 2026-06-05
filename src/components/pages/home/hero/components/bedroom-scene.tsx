import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Center } from '@react-three/drei'

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
            camera={{ position: [3, 2, 5], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 1.5]}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[4, 6, 4]} intensity={1.2} />
                <Environment preset="apartment" />
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
                    autoRotate
                    autoRotateSpeed={0.6}
                />
            </Suspense>
        </Canvas>
    )
}

useGLTF.preload('/models/bedroom.glb')
