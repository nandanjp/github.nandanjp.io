import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Center } from '@react-three/drei'

function PokeballModel() {
    const { scene } = useGLTF('/models/pokeball.glb')
    const clone = useMemo(() => scene.clone(), [scene])
    return (
        <Center>
            <primitive object={clone} scale={1.8} dispose={null} />
        </Center>
    )
}

export function PokeballScene() {
    return (
        <Canvas
            camera={{ position: [0, 0.5, 4], fov: 38 }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 1.5]}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={0.8} />
                <spotLight position={[5, 8, 5]} intensity={2} angle={0.4} penumbra={0.5} castShadow />
                <spotLight position={[-5, 3, -5]} intensity={0.6} color="#8b9fff" />
                <Environment preset="studio" />
                <PokeballModel />
                <OrbitControls
                    enableZoom
                    enablePan={false}
                    enableDamping
                    dampingFactor={0.06}
                    minDistance={2}
                    maxDistance={8}
                    autoRotate
                    autoRotateSpeed={1.2}
                />
            </Suspense>
        </Canvas>
    )
}

useGLTF.preload('/models/pokeball.glb')
