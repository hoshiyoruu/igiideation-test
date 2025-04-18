"use client";

export const dynamic = 'force-dynamic'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { JudgeContext } from "@/hooks/JudgeProvider";
import { Spinner } from "@/components/spinner-loading";
import JudgeHeader from "@/components/judge-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JudgeTableRow from "./JudgeTableRow";
import { ProjectAndJudgeProjectBridge } from "@/util/type";

export default function AdminPage() {
  const judge = useContext(JudgeContext);
  const [projects, setProjects] = useState<ProjectAndJudgeProjectBridge[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProjects = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/projects?judgeId=${judge?.judgeId}`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error: any) {
      console.error(`Failed to get projects : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (judge?.judgeId) handleGetProjects();
  }, [judge?.judgeId]);

  if (judge?.isLoading) return <p>Loading judge id ...</p>;

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center">
        <Spinner className="text-black " />
      </div>
    );
  return (
    <div>
      <JudgeHeader />

      <div className="m-20">
        <h1 className="text-3xl mb-8 font-semibold">Welcome Judge!</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full">
          <div className="rounded-md">
            {projects.length <= 0 ? (
              <p className="h-screen text-center">No project assigned yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project title</TableHead>
                    <TableHead>Marks given</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <JudgeTableRow key={project.id} project={project} />
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
