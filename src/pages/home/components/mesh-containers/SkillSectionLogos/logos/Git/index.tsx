import { useGLTF } from "@react-three/drei";
import { RefObject } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

interface Props {
  position: [number, number, number];
  innerRef: RefObject<THREE.Group>;
}

export default function GitLogo({ position, innerRef }: Props) {
  return (
    <group ref={innerRef} position={position} scale={0}>
      <Model />
    </group>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Curve: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["SVGMat.003"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/3d-models/git-logo.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        material={materials["SVGMat.003"]}
        position={[-0.094, -0.014, -0.041]}
        rotation={[0, 0, -Math.PI / 4]}
      />
    </group>
  );
}

useGLTF.preload("/3d-models/git-logo.glb");
