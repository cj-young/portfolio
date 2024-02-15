import fragmentShader from "@/src/shaders/hero-blob/fragment.glsl?raw";
import vertexShader from "@/src/shaders/hero-blob/vertex.glsl?raw";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import { Mesh, MeshStandardMaterial, ShaderMaterial } from "three";
import ThreeCustomShaderMaterial from "three-custom-shader-material";

import useMousePosition from "@/src/hooks/useMousePosition";

const DISPLACEMENT_FACTOR = 1.5;
const DISPLACEMENT_DENSITY = 0.75;
const END_ANIMATION_SCROLL = 0.75; // number of section heights scrolled when blob fully disappears
const START_SCALE = 1;
const END_SCALE = 0.85;

export default function BlobModel() {
  const materialRef = useRef<ShaderMaterial>(null);
  const meshRef = useRef<Mesh>(null);
  const mousePosition = useMousePosition({});

  useFrame((state, _delta) => {
    const material = materialRef.current;
    const mesh = meshRef.current;
    if (!material || !mesh) return;
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    gsap.to(mesh.rotation, {
      y: mousePosition.x,
      x: mousePosition.y,
      duration: 4,
    });
    const percentScrolled =
      window.scrollY / (END_ANIMATION_SCROLL * window.innerHeight);
    const scale = START_SCALE - percentScrolled * (START_SCALE - END_SCALE);
    mesh.scale.x = scale;
    mesh.scale.y = scale;
    mesh.scale.z = scale;
    const opacity = Math.max(1 - percentScrolled, 0);
    material.opacity = opacity;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <icosahedronGeometry args={[3.5, 50]} />
      <ThreeCustomShaderMaterial
        ref={materialRef}
        baseMaterial={MeshStandardMaterial}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        silent
        uniforms={{
          uTime: { value: 0 },
          displacementFactor: { value: DISPLACEMENT_FACTOR },
          displacementDensity: { value: DISPLACEMENT_DENSITY },
        }}
        color={0xffffff}
        transparent
      />
    </mesh>
  );
}
