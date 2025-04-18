import React, { FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Admin } from "@prisma/client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AdminTableRow = ({ admin }: { admin: Admin }) => {
  const [updatedAdmin, setUpdatedAdmin] = useState<Admin>(admin);
  const handleDeleteAdmin = async (adminId: string) => {
    try {
      const formdata = new FormData();
      formdata.append("adminId", adminId);

      const res = await fetch("/api/admin", {
        method: "DELETE",
        body: formdata,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to delete admin account : ${error}`);
    }
  };

  const handleUpdateAdmin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      const formdata = new FormData();
      formdata.append("admin", JSON.stringify(updatedAdmin));
      formdata.append("adminId", admin.id);

      const res = await fetch("/api/admin", {
        method: "PATCH",
        body: formdata,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to update admin ${admin.name} : ${error}`);
    }
  };

  return (
    <TableRow key={admin.id}>
      <TableCell>{admin.id}</TableCell>
      <TableCell>{admin.name}</TableCell>
      <TableCell>{admin.email}</TableCell>
      <TableCell className="font-semibold">ADMIN</TableCell>
      <TableCell className="flex items-center gap-x-2">
        <Dialog>
          <DialogTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaTrash className="cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Admin</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Admin</DialogTitle>
            </DialogHeader>
            <p>Are you sure to delete this Admin?</p>
            <p className="text-red-500 font-semibold">
              The process is irreversible.
            </p>
            <div className="mt-5 flex justify-end gap-x-4">
              <Button
                variant={"destructive"}
                onClick={() => handleDeleteAdmin(admin.id)}
              >
                Delete Admin
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
                  <p>Update admin account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update admin account</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateAdmin}>
              <div>
                <Label>Name</Label>
                <Input
                  required
                  id="name"
                  onChange={(e) =>
                    setUpdatedAdmin({ ...updatedAdmin, name: e.target.value })
                  }
                  defaultValue={updatedAdmin.name}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  required
                  id="email"
                  onChange={(e) =>
                    setUpdatedAdmin({ ...updatedAdmin, email: e.target.value })
                  }
                  defaultValue={updatedAdmin.email}
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  required
                  id="password"
                  onChange={(e) =>
                    setUpdatedAdmin({
                      ...updatedAdmin,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              <Button className="w-full mt-5">Update admin</Button>
            </form>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default AdminTableRow;
