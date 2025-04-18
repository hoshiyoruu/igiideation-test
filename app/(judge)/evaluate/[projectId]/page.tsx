"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Video,
  FileText,
  File,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { VideoViewer } from "@/app/(judge)/evaluate/[projectId]/VideoViewer";
import { PosterViewer } from "@/app/(judge)/evaluate/[projectId]/PosterViewer";
import { AbstractViewer } from "./AbstractViewer";
import EvalForm from "@/app/(judge)/evaluate/[projectId]/EvalForm";
import { Project } from "@prisma/client";
import JudgeHeader from "@/components/judge-header";
import { SupportingDocumentsViewer } from "./SupportingDocumentsViewer";

export default function JudgeDashboard({
  params,
}: {
  params: { projectId: string };
}) {
  const [activeTab, setActiveTab] = useState("abstract");
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const projectId = params.projectId;
  const [_, setIsLoading] = useState(false);

  const handleGetProject = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/project?projectId=${projectId}`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setProject(data);
      }
    } catch (error: any) {
      console.error(`Failed to get project : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRightPanel = () => {
    setIsRightOpen(!isRightOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "uploaded-videos":
        return <VideoViewer videoLink={project?.videoLink!} />;
      case "abstract":
        return <AbstractViewer abstractLink={project?.abstractLink!} />;
      case "supporting-document-1":
        return (
          <SupportingDocumentsViewer
            supportingDocumentLink={project?.supportingDocumentLink1}
          />
        );
      case "supporting-document-2":
        return (
          <SupportingDocumentsViewer
            supportingDocumentLink={project?.supportingDocumentLink2}
          />
        );

      case "supporting-document-3":
        return (
          <SupportingDocumentsViewer
            supportingDocumentLink={project?.supportingDocumentLink3}
          />
        );

      case "poster":
        return <PosterViewer posterLink={project?.posterLink!} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    handleGetProject();
  }, []);

  return (
    <div>
      <JudgeHeader />
      <div className="flex h-screen">
        {/* Left Panel */}
        <div
          className={`bg-muted transition-all duration-300 ease-in-out ${
            isRightOpen ? "w-2/3" : "w-full"
          } p-4`}
        >
          <nav className="bg-gray-100 p-4 flex justify-between">
            <ScrollArea className="w-full">
              <div className="">
                <Button
                  variant={activeTab === "abstract" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("abstract")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Abstract
                </Button>
                <Button
                  variant={
                    activeTab === "uploaded-videos" ? "default" : "ghost"
                  }
                  className="justify-start"
                  onClick={() => setActiveTab("uploaded-videos")}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Uploaded Videos
                </Button>
                <Button
                  variant={activeTab === "poster" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("poster")}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Posters
                </Button>
                <Button
                  variant={
                    activeTab === "supporting-document-1" ? "default" : "ghost"
                  }
                  className="justify-start"
                  onClick={() => setActiveTab("supporting-document-1")}
                >
                  <File className="mr-2 h-4 w-4" />
                  Supporting Document 1
                </Button>
                <Button
                  variant={
                    activeTab === "supporting-document-2" ? "default" : "ghost"
                  }
                  className="justify-start"
                  onClick={() => setActiveTab("supporting-document-2")}
                >
                  <File className="mr-2 h-4 w-4" />
                  Supporting Document 2
                </Button>
                <Button
                  variant={
                    activeTab === "supporting-document-3" ? "default" : "ghost"
                  }
                  className="justify-start"
                  onClick={() => setActiveTab("supporting-document-3")}
                >
                  <File className="mr-2 h-4 w-4" />
                  Supporting Document 3
                </Button>
              </div>
            </ScrollArea>
          </nav>
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-4">
              Title :{" "}
              <span className="fontsemibold">{project?.titleOfInnovation}</span>
            </h1>
            {renderContent()}
          </main>
        </div>
        {/* Right Panel */}
        <div
          className={`bg-background fixed top-0 right-0 h-full transition-all duration-300 ease-in-out ${
            isRightOpen ? "w-1/3" : "w-0"
          } overflow-hidden`}
        >
          <div className="p-4">
            <EvalForm projectId={project?.id!} />
          </div>
        </div>
        {/* Toggle Button */}
        <Button
          onClick={toggleRightPanel}
          className="fixed top-4 right-4 z-10"
          variant="outline"
          size="icon"
        >
          {isRightOpen ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
