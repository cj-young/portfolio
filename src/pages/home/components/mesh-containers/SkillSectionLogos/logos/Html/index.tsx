import { RefObject } from "react";
import { Group } from "three";

interface Props {
  position: [number, number, number];
  innerRef: RefObject<Group>;
}

export default function HtmlLogo({ position, innerRef }: Props) {
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
    Curve010: THREE.Mesh;
    Curve010_1: THREE.Mesh;
    Curve006: THREE.Mesh;
    Curve006_1: THREE.Mesh;
  };
  materials: {
    ["SVGMat.008"]: THREE.MeshStandardMaterial;
    ["SVGMat.006"]: THREE.MeshStandardMaterial;
    ["SVGMat.009"]: THREE.MeshStandardMaterial;
    ["SVGMat.007"]: THREE.MeshStandardMaterial;
  };
};

function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/3d-models/html-logo.glb",
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={1.5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve011.geometry}
        material={materials["SVGMat.008"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve011_1.geometry}
        material={materials["SVGMat.006"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve010.geometry}
        material={materials["SVGMat.009"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve010_1.geometry}
        material={materials["SVGMat.007"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve006.geometry}
        material={materials["SVGMat.006"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve006_1.geometry}
        material={materials["SVGMat.008"]}
      />
    </group>
  );
}

useGLTF.preload("/3d-models/html-logo.glb");
