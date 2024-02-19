import { useGLTF } from "@react-three/drei";
import { RefObject } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

interface Props {
  position: [number, number, number];
  innerRef: RefObject<THREE.Group>;
}

export default function NextLogo({ position, innerRef }: Props) {
  return (
    <group ref={innerRef} position={position} scale={0}>
      <Model />
    </group>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    Curve: THREE.Mesh;
    Curve001: THREE.Mesh;
    Curve002: THREE.Mesh;
    Curve003: THREE.Mesh;
    Curve004: THREE.Mesh;
    Curve005: THREE.Mesh;
    Curve006: THREE.Mesh;
    Curve007: THREE.Mesh;
  };
  materials: {
    SVGMat: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/3d-models/next-logo.glb",
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={2}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        material={materials.SVGMat}
        position={[-0.054, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve001.geometry}
        material={materials.SVGMat}
        position={[-0.054, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve002.geometry}
        material={materials.SVGMat}
        position={[-0.054, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve003.geometry}
        material={materials.SVGMat}
        position={[-0.054, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve004.geometry}
        material={materials.SVGMat}
        position={[-0.054, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve005.geometry}
        material={materials.SVGMat}
        position={[-0.054, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve006.geometry}
        material={materials.SVGMat}
        position={[-0.054, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve007.geometry}
        material={materials.SVGMat}
        position={[-0.054, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/3d-models/next-logo.glb");
