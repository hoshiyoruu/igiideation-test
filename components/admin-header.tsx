"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const AdminHeader = () => {
  const router = useRouter();
  const handleLogout = async () => {
    let isLogout = false;

    try {
      const res = await fetch("/api/user/logout", { method: "POST" });
      if (res.ok) isLogout = true;
    } catch (error: any) {
      console.error(`Failed to logout : ${error}`);
    } finally {
      if (isLogout) {
        router.push("/");
      }
    }
  };
  return (
    <div className="w-full flex items-center gap-x-5 justify-between p-5 shadow-md">
      <div></div>
      <div className="flex gap-x-5">
        <Link href={"/admin/dashboard/projects"} className="hover:underline">
          Project Management Dashboard
        </Link>
        <Link href={"/admin/dashboard/users"} className="hover:underline">
          Account Management Dashboard
        </Link>
      </div>

      <Button variant={"destructive"} onClick={handleLogout}>
        {" "}
        Logout
      </Button>
    </div>
  );
};

export default AdminHeader;
