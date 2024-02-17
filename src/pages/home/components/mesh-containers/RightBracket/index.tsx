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
    Cube003: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
  };
};

const FINISHED_ANIMATION_WINDOW = 0.125;
const PAGE_INDEX = 1;
const MAX_SCALE = 1;
const MIN_SCALE = 0.85;
const VERTICAL_ROTATION_SPEED = 0.5;
const HORIZONTAL_ROTATION_SPEED = 0.5;

export default function RightBracket(props: JSX.IntrinsicElements["group"]) {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    "/3d-models/right-bracket-with-slash.glb",
  ) as GLTFResult;
  const mousePosition = useMousePosition();

  useFrame(() => {
    if (!groupRef.current) return;
    const group = groupRef.current;

    // z and x are used instead of y and x to account for initial rotation
    gsap.to(group.rotation, {
      z: (mousePosition.x - 0.5) * HORIZONTAL_ROTATION_SPEED,
      x: (mousePosition.y - 0.5) * VERTICAL_ROTATION_SPEED,
      duration: 2,
    });

    const framedPercentageScrolled =
      (window.scrollY - PAGE_INDEX * window.innerHeight) / window.innerHeight;
    if (Math.abs(framedPercentageScrolled) <= FINISHED_ANIMATION_WINDOW) {
      gsap.to(group.scale, {
        x: MAX_SCALE,
        y: MAX_SCALE,
        z: MAX_SCALE,
      });
      gsap.to(materials["Material.002"], {
        opacity: 1,
      });
      gsap.to(materials["Material.003"], {
        opacity: 1,
      });
    } else {
      gsap.to(group.scale, {
        x: MIN_SCALE,
        y: MIN_SCALE,
        z: MIN_SCALE,
      });
      materials["Material.002"].transparent = true;
      materials["Material.003"].transparent = true;
      gsap.to(materials["Material.002"], {
        opacity: 0,
      });
      gsap.to(materials["Material.003"], {
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
          position={[-3.561, 0, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials["Material.003"]}
          position={[-4.339, 0, -2.696]}
          rotation={[0, -Math.PI / 9, 0]}
          scale={[1, 1, 1.215]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/right-bracket-with-slash.glb");
