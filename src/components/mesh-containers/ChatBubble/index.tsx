import { ProjectModelProps } from "@/src/config/projects";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Sphere: THREE.Mesh;
    Sphere001: THREE.Mesh;
    Sphere002: THREE.Mesh;
  };
  materials: {};
};

const ChatBubble = forwardRef<THREE.Group>(
  ({ color, ...props }: ProjectModelProps, ref) => {
    const { nodes } = useGLTF("/3d-models/chat-bubble.glb") as GLTFResult;
    return (
      <group {...props} dispose={null} ref={ref}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.479, -1, -1.737]}
        >
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          position={[0.289, 0, 0]}
          scale={0.278}
        >
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001.geometry}
          position={[0.228, 0, -0.7]}
          scale={0.278}
        >
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002.geometry}
          position={[0.228, 0, 0.7]}
          scale={0.278}
        >
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
    );
  },
);

export default ChatBubble;

useGLTF.preload("/3d-models/chat-bubble.glb");
