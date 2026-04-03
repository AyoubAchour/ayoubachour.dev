import { Suspense, useRef, useCallback, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Point useGLTF's DRACOLoader at our local decoder files
useGLTF.setDecoderPath('/draco/')

function MaxwellModel({ onHover, onUnhover }) {
  const { scene, animations } = useGLTF('/maxwell/scene.gltf')
  const mixerRef = useRef(null)
  const { invalidate } = useThree()
  const animatingRef = useRef(false)

  // Kick frames after the model loads so the canvas renders on frameloop="demand"
  useEffect(() => {
    invalidate()
    const t1 = setTimeout(invalidate, 100)
    const t2 = setTimeout(invalidate, 300)
    const t3 = setTimeout(invalidate, 700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [invalidate])

  // Build mixer from scene directly — avoids useAnimations StrictMode issues
  useEffect(() => {
    if (!scene || !animations?.length) return
    const mixer = new THREE.AnimationMixer(scene)
    mixerRef.current = mixer
    return () => {
      mixer.stopAllAction()
      mixerRef.current = null
    }
  }, [scene, animations])

  // Drive mixer updates while animation is active
  useFrame((_, delta) => {
    if (mixerRef.current && animatingRef.current) {
      mixerRef.current.update(delta)
      invalidate()
    }
  })

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    if (!mixerRef.current || !animations?.length) return

    const clip = animations[0] // "Take 001"
    const action = mixerRef.current.clipAction(clip)
    action.reset()
    action.setLoop(THREE.LoopOnce, 1)
    action.clampWhenFinished = true
    action.play()
    animatingRef.current = true
    invalidate()

    const stop = () => {
      animatingRef.current = false
      action.stop()
      invalidate()
    }
    setTimeout(stop, 4000)
    mixerRef.current.addEventListener('finished', function onFinished() {
      mixerRef.current.removeEventListener('finished', onFinished)
      stop()
    })
  }, [animations, invalidate])

  return (
    <primitive
      object={scene}
      scale={5.0}
      position={[0, -1.2, -1.0]}
      rotation={[0, (60 * Math.PI) / 180, 0]}
      onPointerOver={(e) => { e.stopPropagation(); onHover() }}
      onPointerOut={(e)  => { e.stopPropagation(); onUnhover() }}
      onClick={handleClick}
    />
  )
}

useGLTF.preload('/maxwell/scene.gltf')

export default function Maxwell() {
  const handleHover   = useCallback(() => { document.body.style.cursor = 'pointer' }, [])
  const handleUnhover = useCallback(() => { document.body.style.cursor = '' }, [])
  const isMobile = window.matchMedia('(max-width: 639px)').matches

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 'clamp(150px, 38vw, 480px)',
        height: 'clamp(165px, 40vw, 520px)',
        pointerEvents: 'auto',
        zIndex: 110,
        filter: 'drop-shadow(4px 10px 14px rgba(60,30,5,0.55))',
      }}
    >
      <Canvas
        camera={{ position: [0, 5, 4], fov: 50 }}
        gl={{ alpha: true, antialias: !isMobile }}
        style={{ background: 'transparent' }}
        frameloop="demand"
        dpr={[1, 1.5]}
        shadows={false}
      >
        <ambientLight intensity={2.0} color="#fde8b0" />
        <directionalLight position={[2, 4, 3]} intensity={2.8} color="#fff5e0" />

        <Suspense fallback={null}>
          <MaxwellModel
            onHover={handleHover}
            onUnhover={handleUnhover}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
