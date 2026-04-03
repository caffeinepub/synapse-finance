import { Float, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function GlassPolyhedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.12;
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.z = t * 0.06;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.12;
      wireRef.current.rotation.y = t * 0.18;
      wireRef.current.rotation.z = t * 0.06;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshPhysicalMaterial
          color="#4F8DFF"
          transparent
          opacity={0.08}
          roughness={0}
          metalness={0.1}
          transmission={0.9}
          thickness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.52, 1]} />
        <meshBasicMaterial
          color="#37D6FF"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

function OrbitingNode({
  radius,
  speed,
  offset,
  color,
  size = 0.08,
}: {
  radius: number;
  speed: number;
  offset: number;
  color: string;
  size?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t * 0.7) * radius * 0.4;
      ref.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        roughness={0}
        metalness={0.5}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const count = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        color="#37D6FF"
        size={0.04}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} color="#1a2a5e" />
      <pointLight
        position={[4, 4, 4]}
        color="#37D6FF"
        intensity={3}
        distance={20}
      />
      <pointLight
        position={[-4, -2, -4]}
        color="#A855F7"
        intensity={2}
        distance={20}
      />
      <pointLight
        position={[0, 6, 0]}
        color="#4F8DFF"
        intensity={1.5}
        distance={15}
      />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
        <GlassPolyhedron />
      </Float>

      <OrbitingNode
        radius={2.6}
        speed={0.6}
        offset={0}
        color="#37D6FF"
        size={0.1}
      />
      <OrbitingNode
        radius={3.2}
        speed={0.4}
        offset={2.1}
        color="#A855F7"
        size={0.08}
      />
      <OrbitingNode
        radius={2.0}
        speed={0.8}
        offset={4.2}
        color="#2EE9C7"
        size={0.07}
      />
      <OrbitingNode
        radius={3.8}
        speed={0.3}
        offset={1.0}
        color="#F59E0B"
        size={0.06}
      />

      <FloatingParticles />
      <Stars
        radius={50}
        depth={50}
        count={500}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
