import useMousePosition from "@/src/hooks/useMousePosition";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useScrollContext } from "../../../contexts/ScrollContext";

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
  const { nodes } = useGLTF(
    "/3d-models/right-bracket-with-slash.glb",
  ) as GLTFResult;
  const mousePosition = useMousePosition();
  const { getScrollTop } = useScrollContext();

  const animateOpacity = (group: THREE.Group, opacity: number) => {
    for (let child of group.children) {
      if (child.type === "Mesh") {
        const mesh = child as THREE.Mesh;

        if (mesh.material instanceof Array) {
          mesh.material[0].transparent = true;
        } else {
          mesh.material.transparent = true;
        }
        gsap.to(mesh.material, {
          opacity,
        });
      } else if (child.type === "Group") {
        const childGroup = child as THREE.Group;
        animateOpacity(childGroup, opacity);
      }
    }
  };

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
      (getScrollTop() - PAGE_INDEX * window.innerHeight) / window.innerHeight;
    if (Math.abs(framedPercentageScrolled) <= FINISHED_ANIMATION_WINDOW) {
      gsap.to(group.scale, {
        x: MAX_SCALE,
        y: MAX_SCALE,
        z: MAX_SCALE,
      });
      animateOpacity(group, 1);
    } else {
      gsap.to(group.scale, {
        x: MIN_SCALE,
        y: MIN_SCALE,
        z: MIN_SCALE,
      });

      animateOpacity(group, 0);
    }
  });

  return (
    <group {...props} dispose={null} rotation={[Math.PI / 2, Math.PI, 0]}>
      <group ref={groupRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={[-3.561, 0, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <meshStandardMaterial color={0xfafafa} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          position={[-4.339, 0, -2.696]}
          rotation={[0, -Math.PI / 9, 0]}
          scale={[1, 1, 1.215]}
        >
          <meshStandardMaterial color={0xfafafa} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/3d-models/right-bracket-with-slash.glb");
