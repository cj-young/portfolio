import { useGLTF } from "@react-three/drei";
import { RefObject } from "react";
import * as THREE from "three";
import { Group } from "three";
import { GLTF } from "three-stdlib";

interface Props {
  position: [number, number, number];
  innerRef: RefObject<Group>;
}

export default function JavaScriptLogo({ position, innerRef }: Props) {
  return (
    <group ref={innerRef} position={position} scale={0}>
      <Model />
    </group>
  );
}
type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Curve001: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    SVGMat: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/3d-models/js-logo.glb") as GLTFResult;
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
        geometry={nodes.Curve001.geometry}
        material={materials.SVGMat}
        position={[-0.5, -0.5, 0.359]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/3d-models/js-logo.glb");
