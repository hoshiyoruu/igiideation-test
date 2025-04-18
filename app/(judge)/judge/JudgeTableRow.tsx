import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectAndJudgeProjectBridge } from "@/util/type";

const JudgeTableRow = ({
  project,
}: {
  project: ProjectAndJudgeProjectBridge;
}) => {
  const judgeProjectBridge = project.JudgeProjectBridge[0];

  let totalMark = -1;
  if (judgeProjectBridge.isProjectMarked)
    totalMark =
      judgeProjectBridge.benefitToMankindMark! +
      judgeProjectBridge.commercializationMark! +
      judgeProjectBridge.noveltyAndUniquenessMark! +
      judgeProjectBridge.supportingDocumentMark! +
      judgeProjectBridge.videoPresentationMark! +
      judgeProjectBridge.statusOfInventionMark!;

  return (
    <TableRow key={project.id}>
      <TableCell className="w-4/6">{project.titleOfInnovation}</TableCell>
      <TableCell className="font-semibold w-1/6">
        {totalMark < 0 ? "Not marked yet" : `${totalMark} / 30`}
      </TableCell>
      <TableCell className="w-1/6">
        <Button disabled={judgeProjectBridge.isProjectMarked}>
          <Link href={`/evaluate/${project.id}`}>
            {judgeProjectBridge.isProjectMarked ? "Evaluated" : "Evaluate"}
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default JudgeTableRow;
