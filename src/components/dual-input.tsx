"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, X } from "lucide-react";

type InputMode = "upload" | "text";

interface DualInputProps {
  onFileSelect?: (file: File) => void;
  onTextInput?: (text: string) => void;
  onInputRemove?: () => void;
  accept?: string;
  maxSize?: number; // in MB
}

export function DualInput({
  onFileSelect,
  onTextInput,
  onInputRemove,
  accept = "audio/*",
  maxSize = 100,
}: DualInputProps) {
  const [mode, setMode] = useState<InputMode>("upload");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transcriptText, setTranscriptText] = useState("");
  const [error, setError] = useState<string>("");

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    if (accept === "audio/*" && !file.type.startsWith("audio/")) {
      return "Please select an audio file";
    }

    return null;
  };

  const handleFile = useCallback(
    (file: File) => {
      setError("");

      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setSelectedFile(file);
      setTranscriptText("");
      onFileSelect?.(file);
    },
    [onFileSelect, maxSize, accept]
  );

  const handleTextChange = useCallback(
    (text: string) => {
      setTranscriptText(text);
      setSelectedFile(null);
      setError("");
      onTextInput?.(text);
    },
    [onTextInput]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  const removeInput = useCallback(() => {
    setSelectedFile(null);
    setTranscriptText("");
    setError("");
    onInputRemove?.();
  }, [onInputRemove]);

  const switchMode = useCallback((newMode: string) => {
    const mode = newMode as InputMode;
    setMode(mode);
    setError("");
    if (mode === "upload") {
      setTranscriptText("");
    } else {
      setSelectedFile(null);
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div className="space-y-4">
      <Tabs value={mode} onValueChange={switchMode} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload File
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Paste Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          {!selectedFile ? (
            <Card
              className={`p-8 border-2 border-dashed transition-colors cursor-pointer ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground mb-1">
                    Upload your audio file
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your file here, or click to browse
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  Supports audio files up to {maxSize}MB
                </div>
              </div>
              <input
                id="file-input"
                type="file"
                accept={accept}
                onChange={handleInputChange}
                className="hidden"
              />
            </Card>
          ) : (
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Upload className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeInput}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <div className="space-y-4">
            <Textarea
              placeholder="Paste your transcript here..."
              value={transcriptText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="min-h-[240px] resize-none"
            />
            {transcriptText.trim() && (
              <div className="text-xs text-muted-foreground">
                {transcriptText.length} characters
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}
    </div>
  );
}