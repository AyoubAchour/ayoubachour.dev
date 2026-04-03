import { Suspense, useRef, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'

// Model bounding box (world space, after root node's Y-up conversion):
//   X/Z width : ±1.29  (~2.57 units wide)
//   Y height  : 0 → 3.39  (base near Y=0, coffee surface at Y≈3.4)

function CupModel({ onHover, onUnhover }) {
  const { scene } = useGLTF('/scene.gltf')
  const groupRef = useRef()

  // Shake state lives in a ref — no re-renders, just raw mutation each frame
  const shakeRef = useRef({ active: false, startTime: 0 })

  // invalidate() queues a single render — used to kick off and sustain the animation
  const { invalidate } = useThree()

  // Drive the shake animation frame by frame.
  // While shaking: update rotation.z, call invalidate() to request the next frame.
  // When done: snap back to 0, stop calling invalidate — canvas goes quiet again.
  useFrame((state) => {
    if (!shakeRef.current.active || !groupRef.current) return

    const elapsed = (performance.now() - shakeRef.current.startTime) / 1000
    const duration = 0.55

    if (elapsed >= duration) {
      shakeRef.current.active = false
      groupRef.current.rotation.z = 0
      state.invalidate() // one final render to snap cleanly back
      return
    }

    // Decaying sine: amplitude starts at 0.08 rad (~4.6°) and shrinks to 0
    // frequency = 25 rad/s → ~2 full oscillations over 0.55 s
    const t = elapsed / duration
    const amplitude = 0.08 * (1 - t)
    groupRef.current.rotation.z = amplitude * Math.sin(elapsed * 25)

    state.invalidate() // queue next frame
  })

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    shakeRef.current.active = true
    shakeRef.current.startTime = performance.now()
    invalidate() // kick off the first useFrame call
  }, [invalidate])

  return (
    <Center position={[-0.45, -0.5, 0]}>
      {/*
        group carries the shake rotation (z only).
        primitive keeps its own rotation [-0.18, π, 0] untouched.
        The two compose, so the model stays visually correct at rest.
      */}
      <group ref={groupRef}>
        <primitive
          object={scene}
          rotation={[-0.18, Math.PI, 0]}
          onPointerOver={(e) => { e.stopPropagation(); onHover() }}
          onPointerOut={(e)  => { e.stopPropagation(); onUnhover() }}
          onClick={handleClick}
        />
      </group>
    </Center>
  )
}

useGLTF.preload('/scene.gltf')

export default function CoffeeCup() {
  const handleHover   = useCallback(() => { document.body.style.cursor = 'pointer' }, [])
  const handleUnhover = useCallback(() => { document.body.style.cursor = '' }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: '2vh',
        right: '8vw',
        width: 'clamp(100px, 22vw, 215px)',
        height: 'clamp(120px, 26vw, 265px)',
        pointerEvents: 'auto',
        zIndex: 110,
        filter: 'drop-shadow(4px 10px 14px rgba(60,30,5,0.55))',
      }}
    >
      <Canvas
        camera={{ position: [0, 5, 4], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
        frameloop="demand"
        shadows={false}
      >
        <ambientLight intensity={1.5} color="#fde8b0" />
        <directionalLight position={[-2, 4, 3]} intensity={2.5} color="#fff5e0" />

        <Suspense fallback={null}>
          <CupModel
            onHover={handleHover}
            onUnhover={handleUnhover}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
