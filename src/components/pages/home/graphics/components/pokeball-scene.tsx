import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Center } from '@react-three/drei'

function PlayerRoomModel() {
    const { scene } = useGLTF('/models/pokemon-player-room.glb')
    const clone = useMemo(() => scene.clone(), [scene])
    return (
        <Center>
            <primitive object={clone} scale={0.5} dispose={null} />
        </Center>
    )
}

export function PokeballScene() {
    return (
        <Canvas
            frameloop="demand"
            camera={{ position: [3, 2.5, 7], fov: 42 }}
            gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
            dpr={[0.8, 1]}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={1.2} />
                <spotLight position={[5, 8, 5]} intensity={1.5} angle={0.45} penumbra={0.6} castShadow />
                <spotLight position={[-4, 4, -4]} intensity={0.5} color="#ffe0b0" />

                <PlayerRoomModel />
                <OrbitControls
                    enableZoom
                    enablePan={false}
                    enableDamping
                    dampingFactor={0.06}
                    minDistance={4}
                    maxDistance={14}
                />
            </Suspense>
        </Canvas>
    )
}
