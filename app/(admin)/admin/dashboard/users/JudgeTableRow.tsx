import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { FormEvent } from "react";
import { Judge } from "@prisma/client";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const JudgeTableRow = ({ judge }: { judge: Judge }) => {
  const [updatedJudge, setUpdatedJudge] = useState<Judge>(judge);

  const handleUpdateJudge = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const formdata = new FormData();
      formdata.append("judge", JSON.stringify(updatedJudge));
      formdata.append("judgeId", judge.id);

      const res = await fetch("/api/judge", { method: "PATCH", body: formdata });
      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to update judge ${judge.name} : ${error}`);
    }
  };

  const handleDeleteJudge = async (judgeId: string) => {
    try {
      const formdata = new FormData();
      formdata.append("judgeId", judgeId);

      const res = await fetch("/api/judge", {
        method: "DELETE",
        body: formdata,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to delete judge account : ${error}`);
    }
  };

  return (
    <TableRow key={judge.id}>
      <TableCell>{judge.id}</TableCell>
      <TableCell>{judge.name}</TableCell>
      <TableCell>{judge.email}</TableCell>
      <TableCell className="font-semibold">JUDGE</TableCell>
      <TableCell className="flex items-center gap-x-2">
        <Dialog>
          <DialogTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaTrash className="cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Judge</DialogTitle>
            </DialogHeader>
            <p>Are you sure to delete this judge?</p>
            <p className="text-red-500 font-semibold">
              The process is irreversible.
            </p>
            <div className="mt-5 flex justify-end gap-x-4">
              <Button
                variant={"destructive"}
                onClick={() => handleDeleteJudge(judge.id)}
              >
                Delete Judge
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaEdit className="cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Update judge account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update judge account</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateJudge}>
              <div>
                <Label>Name</Label>
                <Input
                  required
                  id="name"
                  onChange={(e) =>
                    setUpdatedJudge({ ...updatedJudge, name: e.target.value })
                  }
                  defaultValue={updatedJudge.name}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  required
                  id="email"
                  onChange={(e) =>
                    setUpdatedJudge({ ...updatedJudge, email: e.target.value })
                  }
                  defaultValue={updatedJudge.email}
                />
              </div>
              <div>
                <Label>Association</Label>
                <Input
                  required
                  id="association"
                  onChange={(e) =>
                    setUpdatedJudge({
                      ...updatedJudge,
                      association: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  required
                  id="password"
                  onChange={(e) =>
                    setUpdatedJudge({
                      ...updatedJudge,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              <Button className="w-full mt-5">Update judge</Button>
            </form>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default JudgeTableRow;
