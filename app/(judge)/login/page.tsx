"use client";

export const dynamic = 'force-dynamic'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useEffect, useState } from "react";
import { Spinner } from "@/components/spinner-loading";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { JudgeContext } from "@/hooks/JudgeProvider";
import isCookiesExists from "@/util/isCookiesExists";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState("idle");
  const router = useRouter();
  const judge = useContext(JudgeContext);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let isAuth = false;

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("type", "JUDGE");

      const res = await fetch("/api/user/login", {
        method: "POST",
        body: formData,
      });

      const judgeInfo = await res.json();

      if (res.ok) {
        isAuth = true;
        judge?.setJudgeId(judgeInfo.id);
      } else {
        setLoginStatus("failed");
        setTimeout(() => {
          setLoginStatus("idle");
        }, 2000);
      }
    } catch (error: any) {
      console.error(`Failed to login`, error);
    } finally {
      setIsLoading(false);
      if (isAuth) router.push("/judge");
    }
  };

  const handleCheckCookie = async () => {
    const isExists = await isCookiesExists();
    console.log(isExists)
    if (isExists) router.push("/judge");
  };

  useEffect(() => {
    handleCheckCookie();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Login as Judge Account
            </CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Please enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Please enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? <Spinner className="text-white" /> : "Login"}
              </Button>

              {loginStatus === "failed" && (
                <p className="text-red-500 text-center">
                  Wrong email or password
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
     
    </div>
  );
}
