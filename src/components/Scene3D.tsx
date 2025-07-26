import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

// This creates a floating cube
const FloatingCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // This makes it rotate and float
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={[-2, 0, 0]}>
      <meshStandardMaterial color="#6366f1" />
    </Box>
  );
};

// Main 3D scene component
const Scene3D: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingCube />
        <Sphere args={[0.5, 32, 32]} position={[2, 1, 0]}>
          <meshStandardMaterial color="#ec4899" />
        </Sphere>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Scene3D;