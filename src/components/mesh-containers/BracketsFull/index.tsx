import { ProjectModelProps } from "@/src/config/projects";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube004: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["Material.004"]: THREE.MeshStandardMaterial;
  };
};

const BracketsFull = forwardRef<THREE.Group>(
  ({ color, ...props }: ProjectModelProps, ref) => {
    const { nodes, materials } = useGLTF(
      "/3d-models/brackets-full.glb",
    ) as GLTFResult;
    return (
      <group {...props} dispose={null} ref={ref}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials["Material.002"]}
          position={[-6.061, 0, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials["Material.003"]}
          position={[-6.839, 0, -2.696]}
          rotation={[0, -Math.PI / 9, 0]}
          scale={[1, 1, 1.215]}
        >
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials["Material.004"]}
          position={[6.061, 0, 0]}
          rotation={[Math.PI, -Math.PI / 4, 0]}
          scale={-1}
        >
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
    );
  },
);

export default BracketsFull;

useGLTF.preload("/3d-models/brackets-full.glb");
