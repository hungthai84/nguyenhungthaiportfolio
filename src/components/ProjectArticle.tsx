import React, { useState, useEffect } from "react";
import { ProjectCard } from "../data/projectsData";
import { CaseStudy1_1 } from "./case-study-1-1/CaseStudy1_1";

interface ProjectArticleProps {
  project: ProjectCard;
  onBack: () => void;
  onSelectProject?: (p: ProjectCard) => void;
}

export function ProjectArticle({ project, onBack }: ProjectArticleProps) {
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Scroll to top on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project.id]);

  return <CaseStudy1_1 project={project} onBack={onBack} onZoomImage={setZoomImage} />;
}
