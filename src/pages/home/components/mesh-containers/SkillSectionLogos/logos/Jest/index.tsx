import { RefObject } from "react";
import { Group } from "three";

interface Props {
  position: [number, number, number];
  innerRef: RefObject<Group>;
}

export default function JestLogo({ position, innerRef }: Props) {
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
    Curve002: THREE.Mesh;
    Sphere: THREE.Mesh;
    Sphere001: THREE.Mesh;
    Sphere002: THREE.Mesh;
    Curve003: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/3d-models/jest-logo.glb",
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve002.geometry}
        material={materials.Material}
        position={[-0.444, -0.507, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={8.145}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials.Material}
        position={[-0.295, 0.003, 0]}
        scale={-0.106}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials.Material}
        position={[0.02, 0.003, 0]}
        scale={-0.106}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials.Material}
        position={[0.318, 0.003, 0]}
        scale={-0.106}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve003.geometry}
        material={materials.Material}
        position={[-0.444, -0.507, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[8.116, 75.135, 8.116]}
      />
    </group>
  );
}

useGLTF.preload("/3d-models/jest-logo.glb");
