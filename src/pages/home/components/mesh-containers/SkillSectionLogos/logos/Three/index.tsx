import { RefObject } from "react";

interface Props {
  position: [number, number, number];
  innerRef: RefObject<THREE.Group>;
}

export default function ThreeLogo({ position, innerRef }: Props) {
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
    path1: THREE.Mesh;
  };
  materials: {
    ["SVGMat.026"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/3d-models/three-logo.glb",
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={1.25}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.path1.geometry}
        material={materials["SVGMat.026"]}
      />
    </group>
  );
}

useGLTF.preload("/3d-models/three-logo.glb");
