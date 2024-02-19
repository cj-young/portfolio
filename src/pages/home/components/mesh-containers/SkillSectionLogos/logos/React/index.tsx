import { useGLTF } from "@react-three/drei";
import { RefObject } from "react";
import * as THREE from "three";
import { Group } from "three";
import { GLTF } from "three-stdlib";

interface Props {
  position: [number, number, number];
  innerRef: RefObject<Group>;
}

export default function ReactLogo({ position, innerRef }: Props) {
  return (
    <group ref={innerRef} position={position} scale={0}>
      <Model />
    </group>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    Curve: THREE.Mesh;
  };
  materials: {
    ["SVGMat.001"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/3d-models/react-logo.glb",
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={1.25}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        material={materials["SVGMat.001"]}
        position={[-0.43, -0.429, -0.047]}
      />
    </group>
  );
}

useGLTF.preload("/3d-models/react-logo.glb");
