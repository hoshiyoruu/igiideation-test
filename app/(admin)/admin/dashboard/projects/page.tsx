"use client";

import { FaPlus } from "react-icons/fa";

import React, { ChangeEvent, FormEvent, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Judge } from "@prisma/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import AdminHeader from "@/components/admin-header";
import ProjectTableRow from "./ProjectTableRow";
import { ProjectAndTotalJudgesType } from "@/util/type";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<ProjectAndTotalJudgesType[]>();
  const [judges, setJudges] = useState<Judge[]>();
  const [projectForm, setProjectForm] = useState({
    titleOfInnovation: "",
    abstractLink: "",
    posterLink: "",
    videoLink: "",
    supportingDocumentLink1: "",
    supportingDocumentLink2: "",
    supportingDocumentLink3: "",
  });

  const [_, setIsLoading] = useState(false);

  const handleGetProjects = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/projects", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error: any) {
      console.error(`Failed to load projects`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetJudges = async () => {
    try {
      const res = await fetch("/api/judges", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setJudges(data);
      }
    } catch (error) {
      console.error(`Failed to get judges : ${error}`);
    }
  };

  const handleCreateProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("project", JSON.stringify(projectForm));

      const res = await fetch("/api/project", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error) {
      console.error(`Failed to create project : ${error}`);
    }
  };

  const handleChangeProjectForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProjectForm({
      ...projectForm,
      [id]: value,
    });
  };

  useEffect(() => {
    async function getData() {
      await handleGetProjects();
      await handleGetJudges();
    }

    getData();
  }, []);

  return (
    <div>
      <AdminHeader />
      <div className="m-20 px-5">
        <h1 className="text-2xl mb-5 font-semibold">
          Project Management Dashboard
        </h1>
        <div className="w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard/projects">
                  Projects
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center py-4 justify-end">
            {/* <Input placeholder="Filter title..." className="max-w-sm" /> */}
            <div className="flex flex-row">
              <Button
                className="mr-5 text-black bg-white border-2 hover:bg-gray-200"
                asChild
              >
                <Link href="/admin/dashboard/leaderboard">Leaderboard</Link>
              </Button>

              <Dialog>
                <DialogTrigger className="bg-primary text-secondary rounded-md p-1 px-2 flex items-center gap-x-2">
                  <FaPlus />
                  Create Project
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateProject}>
                    <div>
                      <Label>Title of innovation</Label>
                      <Input
                        id="titleOfInnovation"
                        required
                        onChange={(e) => handleChangeProjectForm(e)}
                      />
                    </div>
                    <div>
                      <Label>Abstract Link</Label>
                      <Input
                        id="abstractLink"
                        onChange={(e) => handleChangeProjectForm(e)}
                      />
                    </div>
                    <div>
                      <Label>Poster Link</Label>
                      <Input
                        id="posterLink"
                        onChange={(e) => handleChangeProjectForm(e)}
                      />
                    </div>
                    <div>
                      <Label>Video Link</Label>
                      <Input
                        id="videoLink"
                        onChange={(e) => handleChangeProjectForm(e)}
                      />
                    </div>
                    <div>
                      <Label>Supporting documents</Label>
                      <Input
                        placeholder="Supporting document 1"
                        onChange={(e) => handleChangeProjectForm(e)}
                        id="supportingDocumentLink1"
                      />
                      <Input
                        placeholder="Supporting document 2"
                        onChange={(e) => handleChangeProjectForm(e)}
                        id="supportingDocumentLink2"
                      />
                      <Input
                        placeholder="Supporting document 3"
                        id="supportingDocumentLink3"
                        onChange={(e) => handleChangeProjectForm(e)}
                      />
                    </div>
                    <Button className="w-full mt-5" type="submit">
                      Create Title
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Project title</TableHead>
                  <TableHead>Judges assigned</TableHead>
                  <TableHead>Action(s)</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {projects?.map((project) => (
                  <ProjectTableRow
                    project={project}
                    judges={judges!}
                    key={project.id}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
