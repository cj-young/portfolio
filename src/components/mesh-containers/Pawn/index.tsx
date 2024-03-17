import { ProjectModelProps } from "@/src/config/projects";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Sphere: THREE.Mesh;
  };
  materials: {};
};

const Pawn = forwardRef<THREE.Group>(
  ({ color, ...props }: ProjectModelProps, ref) => {
    const { nodes } = useGLTF("/3d-models/pawn.glb") as GLTFResult;
    return (
      <group {...props} dispose={null} ref={ref}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={[0, -1.577, 0]}
        >
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          position={[0, 1.062, 0]}
          scale={0.537}
        >
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
    );
  },
);

export default Pawn;

useGLTF.preload("/3d-models/pawn.glb");
