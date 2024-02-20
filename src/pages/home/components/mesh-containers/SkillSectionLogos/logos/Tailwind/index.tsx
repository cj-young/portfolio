import { useGLTF } from "@react-three/drei";
import { RefObject } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

interface Props {
  position: [number, number, number];
  innerRef: RefObject<THREE.Group>;
}

export default function TailwindLogo({ position, innerRef }: Props) {
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
    ["SVGMat.002"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/3d-models/tailwind-logo.glb",
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        material={materials["SVGMat.002"]}
        position={[0, -0.013, 0.047]}
      />
    </group>
  );
}

useGLTF.preload("/3d-models/tailwind-logo.glb");
