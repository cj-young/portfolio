import { useFrame } from "@react-three/fiber";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function CanvasAutoSizer({ children }: Props) {
  useFrame((state) => {
    if (!state.gl.domElement?.parentElement) return;

    const { width, height } =
      state.gl.domElement.parentElement.getBoundingClientRect();
    if (state.size.width !== width && state.size.height !== height) {
      state.setSize(width, height, true, 0, 0);
    }
  });

  return children ?? null;
}
