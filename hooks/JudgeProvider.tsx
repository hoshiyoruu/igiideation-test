"use client";

import { createContext, useEffect } from "react";
import { useState } from "react";
import React from "react";

export const JudgeContext = createContext<
  | {
      judgeId: string | undefined;
      setJudgeId: React.Dispatch<React.SetStateAction<string | undefined>>;
      isLoading: boolean;
    }
  | undefined
>(undefined);

const JudgeProvider = ({ children }: { children: React.ReactNode }) => {
  const [judgeId, setJudgeId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetJudge = async () => {
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setJudgeId(data);
      }
    } catch (error: any) {
      console.error(
        `Failed to get judge account information : ${error.message}"`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetJudge();
  }, []);

  if (isLoading) return <p>Loading data ...</p>;
  else
    return (
      <JudgeContext.Provider value={{ judgeId, setJudgeId, isLoading }}>
        {children}
      </JudgeContext.Provider>
    );
};

export default JudgeProvider;
