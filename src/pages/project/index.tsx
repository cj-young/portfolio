import { Project } from "@/src/config/projects";

interface Props {
  project: Project;
}

export default function ProjectPage({ project }: Props) {
  return (
    <div
      className="fixed inset-0"
      style={{
        backgroundColor: project.backgroundColor,
      }}
    >
      index
    </div>
  );
}
