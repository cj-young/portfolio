import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import { Mesh, MeshStandardMaterial, ShaderMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import useMousePosition from "../../../../hooks/useMousePosition";
import fragmentShader from "../../../../shaders/hero-blob/fragment.glsl?raw";
import vertexShader from "../../../../shaders/hero-blob/vertex.glsl?raw";

export default function BlobModel() {
  const materialRef = useRef<ShaderMaterial>(null);
  const meshRef = useRef<Mesh>(null);
  const mousePosition = useMousePosition({});

  useFrame((state, _delta) => {
    const material = materialRef.current;
    const mesh = meshRef.current;
    if (!material || !mesh) return;
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    // mesh.rotation.y = mousePosition.x;
    // mesh.rotation.x = mousePosition.y;
    gsap.to(mesh.rotation, {
      y: mousePosition.x,
      x: mousePosition.y,
      duration: 4,
    });
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.25, 100]} />
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={MeshStandardMaterial}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        silent
        uniforms={{ uTime: { value: 0 } }}
        color={0xffffff}
      />
    </mesh>
  );
}
