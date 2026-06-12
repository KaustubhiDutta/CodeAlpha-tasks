import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function GlobeMesh() {
  return (
    <mesh>
      {/* sphere */}
      <sphereGeometry args={[1, 64, 64]} />

      {/* globe texture */}
      <meshStandardMaterial
        map={null}
        color="#1f6feb"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}

const Globe3D = () => {
  return (
    <div className="w-[360px] h-[360px]">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        
        {/* lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 2, 2]} intensity={1} />

        {/* globe */}
        <GlobeMesh />

        {/* optional manual control */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
};

export default Globe3D;