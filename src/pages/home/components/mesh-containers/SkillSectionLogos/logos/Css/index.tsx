import { RefObject } from "react";

interface Props {
  position: [number, number, number];
  innerRef: RefObject<THREE.Group>;
}

export default function CssLogo({ position, innerRef }: Props) {
  return (
    <group ref={innerRef} position={position} scale={0}>
      <Model />
    </group>
  );
}

import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Curve011: THREE.Mesh;
    Curve011_1: THREE.Mesh;
    Tier_2: THREE.Mesh;
    polygon2997001: THREE.Mesh;
    polygon2997001_1: THREE.Mesh;
  };
  materials: {
    ["SVGMat.006"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/3d-models/css-logo.glb") as GLTFResult;
  return (
    <group {...props} dispose={null} scale={1.5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tier_2.geometry}
        material={materials["SVGMat.006"]}
      />
      <group position={[-0.477, -0.386, 0.08]} scale={8.253}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polygon2997001.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polygon2997001_1.geometry}
          material={materials["Material.001"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve011.geometry}
        material={materials["SVGMat.006"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve011_1.geometry}
        material={materials["SVGMat.006"]}
      />
    </group>
  );
}

useGLTF.preload("/3d-models/css-logo.glb");
