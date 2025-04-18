"use client";

export const dynamic = "force-dynamic";

import AdminHeader from "@/components/admin-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Admin, Judge } from "@prisma/client";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useState } from "react";
import AdminTableRow from "./AdminTableRow";
import JudgeTableRow from "./JudgeTableRow";

const UsersDashboardPage = () => {
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [judgeForm, setJudgeForm] = useState({
    name: "",
    email: "",
    association: "",
    password: "",
  });

  const [admins, setAdmins] = useState<Admin[]>();
  const [judges, setJudges] = useState<Judge[]>();

  const handleChangeAdminForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAdminForm({
      ...adminForm,
      [id]: value,
    });
  };
  const handleChangeJudgeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setJudgeForm({
      ...judgeForm,
      [id]: value,
    });
  };

  const handleCreateAdmin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const admin = {
        name: adminForm.name,
        email: adminForm.email,
        password: adminForm.password,
        type: "ADMIN",
      };

      console.log(admin);

      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to create admin account : ${error}`);
    }
  };

  const handleCreateJudge = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const judge = {
        name: judgeForm.name,
        email: judgeForm.email,
        password: judgeForm.password,
        association: judgeForm.association,
        type: "JUDGE",
      };

      const res = await fetch("/api/judge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(judge),
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to create judge account : ${error}`);
    }
  };

  const handleGetAdmins = async () => {
    try {
      const res = await fetch("/api/admins", { method: "GET" });

      if (res.ok) {
        const data = await res.json();
        setAdmins(data);
      }
    } catch (error: any) {
      console.error(`Failed to get admin accounts : ${error}`);
    }
  };

  const handleGetJudges = async () => {
    try {
      const res = await fetch("/api/judges", { method: "GET" });

      if (res.ok) {
        const data = await res.json();
        setJudges(data);
      }
    } catch (error: any) {
      console.error(`Failed to get judge accounts :${error}`);
    }
  };

  useEffect(() => {
    async function getData() {
      await handleGetAdmins();
      await handleGetJudges();
    }

    getData();
  }, []);

  return (
    <div>
      <AdminHeader />
      <div className="m-20 px-5">
        <h1 className="text-2xl font-semibold mb-5">
          Account Management Dashboard
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard/users">
                Users
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center py-4 justify-end">
          {/* <Input placeholder="Filter User..." className="max-w-sm" /> */}
          <div className="flex gap-x-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  // variant="outline"
                  className="bg-black text-white hover:text-white"
                >
                  Create Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Admin</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateAdmin}>
                  <div>
                    <Label>Name</Label>
                    <Input
                      required
                      id="name"
                      onChange={(e) => handleChangeAdminForm(e)}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      required
                      id="email"
                      onChange={(e) => handleChangeAdminForm(e)}
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      required
                      id="password"
                      onChange={(e) => handleChangeAdminForm(e)}
                    />
                  </div>

                  <Button className="w-full mt-5">Create Admin</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  // variant="outline"
                  className="bg-black text-white hover:text-white"
                >
                  Create Judge
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Judge</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateJudge}>
                  <div>
                    <Label>Name</Label>
                    <Input
                      required
                      id="name"
                      onChange={(e) => handleChangeJudgeForm(e)}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      required
                      id="email"
                      onChange={(e) => handleChangeJudgeForm(e)}
                    />
                  </div>
                  <div>
                    <Label>Association</Label>
                    <Input
                      required
                      id="association"
                      onChange={(e) => handleChangeJudgeForm(e)}
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      required
                      id="password"
                      onChange={(e) => handleChangeJudgeForm(e)}
                    />
                  </div>

                  <Button className="w-full mt-5" type="submit">
                    Create Judge
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* the table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Account Type</TableHead>
              <TableHead>Action(s)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins?.map((admin) => (
              <AdminTableRow key={admin.id} admin={admin} />
            ))}

            {judges?.map((judge) => (
              <JudgeTableRow key={judge.id} judge={judge} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersDashboardPage;
