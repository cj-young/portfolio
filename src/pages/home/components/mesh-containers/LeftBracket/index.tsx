import useMousePosition from "@/src/hooks/useMousePosition";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

const FINISHED_ANIMATION_WINDOW = 0.125;
const PAGE_INDEX = 1;
const MAX_SCALE = 1;
const MIN_SCALE = 0.85;
const VERTICAL_ROTATION_SPEED = 0.5;
const HORIZONTAL_ROTATION_SPEED = 0.5;

export default function LeftBracket(props: JSX.IntrinsicElements["group"]) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { nodes, materials } = useGLTF(
    "/3d-models/left-bracket.glb",
  ) as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useMousePosition();

  useFrame(() => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;

    const group = groupRef.current;
    if (group) {
      // z and x are used instead of y and x to account for initial rotation
      gsap.to(group.rotation, {
        z: (mousePosition.x - 0.5) * HORIZONTAL_ROTATION_SPEED,
        x: -(mousePosition.y - 0.5) * VERTICAL_ROTATION_SPEED,
        duration: 2,
      });
    }

    const framedPercentageScrolled =
      (window.scrollY - PAGE_INDEX * window.innerHeight) / window.innerHeight;
    if (Math.abs(framedPercentageScrolled) <= FINISHED_ANIMATION_WINDOW) {
      gsap.to(mesh.scale, {
        x: MAX_SCALE,
        y: MAX_SCALE,
        z: MAX_SCALE,
      });
      gsap.to(materials["Material.002"], {
        opacity: 1,
      });
    } else {
      gsap.to(mesh.scale, {
        x: MIN_SCALE,
        y: MIN_SCALE,
        z: MIN_SCALE,
      });
      materials["Material.002"].transparent = true;
      gsap.to(materials["Material.002"], {
        opacity: 0,
      });
    }
  });

  return (
    <group {...props} dispose={null} rotation={[Math.PI / 2, Math.PI, 0]}>
      <group ref={groupRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials["Material.002"]}
          position={[1.061, 0, 0]}
          rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
          ref={meshRef}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/left-bracket.glb");
