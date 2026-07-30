"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { projects, defaultProjectId, type Project } from "@/lib/projects";

type ProjectContextValue = {
  current: Project;
  projects: Project[];
  setCurrentId: (id: string) => void;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

function getInitialProject(): string {
  if (typeof window === "undefined") return defaultProjectId;
  const stored = localStorage.getItem("aura.project");
  return stored && projects.find((p) => p.id === stored) ? stored : defaultProjectId;
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [currentId, setCurrentIdState] = useState<string>(getInitialProject);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("aura.project", currentId);
  }, [currentId]);

  const setCurrentId = (id: string) => setCurrentIdState(id);

  const current = projects.find((p) => p.id === currentId) || projects[0];

  return (
    <ProjectContext.Provider value={{ current, projects, setCurrentId }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be used within ProjectProvider");
  return ctx;
}
