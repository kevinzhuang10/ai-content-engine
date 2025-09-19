"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText, User, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  created: Date;
}

interface ProjectSidebarProps {
  projects?: Project[];
  activeProject?: string;
  onProjectSelect?: (projectId: string) => void;
  onNewProject?: () => void;
  user?: any;
  onSignOut?: () => void;
}

export function ProjectSidebar({
  projects = [],
  activeProject,
  onProjectSelect,
  onNewProject,
  user,
  onSignOut,
}: ProjectSidebarProps) {
  const mockProjects: Project[] = [
    { id: "1", name: "Podcast Episode #45", created: new Date("2024-01-15") },
    { id: "2", name: "Product Launch Video", created: new Date("2024-01-14") },
    { id: "3", name: "Weekly Team Meeting", created: new Date("2024-01-13") },
  ];

  const projectList = projects.length > 0 ? projects : mockProjects;

  return (
    <div className="w-80 h-screen bg-background border-r border-border p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-2">
          AI Content Engine
        </h1>
        <p className="text-sm text-muted-foreground">
          Turn audio into social content
        </p>
      </div>

      <div className="mb-6">
        <Button
          onClick={onNewProject}
          className="w-full justify-start gap-2"
          size="lg"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Recent Projects
          </h2>
          {projectList.map((project) => (
            <Card
              key={project.id}
              className={`p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                activeProject === project.id ? "bg-muted border-primary" : ""
              }`}
              onClick={() => onProjectSelect?.(project.id)}
            >
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm text-foreground truncate">
                    {project.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {project.created.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* User Menu */}
      {user && (
        <div className="mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 p-3 h-auto hover:bg-muted/50"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">
                    {user.email}
                  </div>
                </div>
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={onSignOut}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
