"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const JudgeHeader = () => {
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
    <div className="w-full flex items-center p-4 shadow-md justify-between">
      <Link href={"/"}>
        <Image
          src={"/image/IGIIDeation-2025-BANNER.png"}
          width={200}
          height={200}
          alt="IGIIDeation Logo"
        />
      </Link>
      <Button variant={"destructive"} onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default JudgeHeader;
