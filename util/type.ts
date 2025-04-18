import { Project, JudgeProjectBridge, Judge } from "@prisma/client";

type JudgeProjectBridgeAndJudge = JudgeProjectBridge & { judge: Judge };
export type ProjectAndTotalJudgesType = Project & {
  JudgeProjectBridge: JudgeProjectBridgeAndJudge[];
} & { totalJudges: number };
export type ProjectAndJudgeProjectBridge = Project & {
  JudgeProjectBridge: JudgeProjectBridge[];
};
