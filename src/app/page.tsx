"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectSidebar } from "@/components/project-sidebar";
import { DualInput } from "@/components/dual-input";
import { ContentTypeSelection } from "@/components/content-type-selection";
import { useAuth } from "@/context/auth-context";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transcriptText, setTranscriptText] = useState<string>("");
  const [contentSelections, setContentSelections] = useState<{
    [key: string]: number;
  }>({});
  const [activeProject, setActiveProject] = useState<string>("");
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setTranscriptText(""); // Clear text when file is selected
  };

  const handleTextInput = (text: string) => {
    setTranscriptText(text);
    setSelectedFile(null); // Clear file when text is entered
  };

  const handleInputRemove = () => {
    setSelectedFile(null);
    setTranscriptText("");
  };

  const handleContentSelectionChange = (selections: {
    [key: string]: number;
  }) => {
    setContentSelections(selections);
  };

  const handleGenerate = () => {
    // This is UI only for now - will be implemented later
    console.log("Generate content:", {
      selectedFile,
      transcriptText,
      contentSelections,
    });
  };

  const handleProjectSelect = (projectId: string) => {
    setActiveProject(projectId);
  };

  const handleNewProject = () => {
    // Reset current project state
    setActiveProject("");
    setSelectedFile(null);
    setTranscriptText("");
    setContentSelections({});
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const canGenerate =
    (selectedFile || transcriptText.trim()) &&
    Object.keys(contentSelections).length > 0;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Project Sidebar */}
      <ProjectSidebar
        activeProject={activeProject}
        onProjectSelect={handleProjectSelect}
        onNewProject={handleNewProject}
        user={user}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold">New Project</h1>
            </div>
            {!user && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* File Upload */}
            <div className="space-y-4 mt-20">
              <h3 className="text-xl font-semibold text-foreground">
                1. Upload File or Enter Transcription
              </h3>
              <p className="text-sm text-muted-foreground">
                Upload audio file or paste transcript text. Supported formats:
                MP3, WAV, M4A
              </p>
              <DualInput
                onFileSelect={handleFileSelect}
                onTextInput={handleTextInput}
                onInputRemove={handleInputRemove}
              />
            </div>

            {/* Content Type Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                2. Select Content Types
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose which platforms you'd like to create content for
              </p>
              <ContentTypeSelection
                onSelectionChange={handleContentSelectionChange}
              />
            </div>

            {/* Generate Button */}
            <div className="space-y-4 mt-30">
              {/* <h3 className="text-xl font-semibold text-foreground">3. Generate Content</h3> */}
              <div className="text-center space-y-4">
                <Button
                  size="lg"
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="w-full h-12 text-base"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  {/* {canGenerate ? "Generate Social Media Content" : "Complete steps above to generate"} */}
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
