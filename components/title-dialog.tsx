import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TitleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  video: string;
  support: string;
  poster: string;
  // Add more props as needed for additional details
}

export function TitleDialog({ isOpen, onClose, title,video,support,poster }: TitleDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title Details</DialogTitle>
          <DialogDescription>
            Here are the details for the selected title.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4 flex flex-row">
          <h3 className="font-semibold pr-3">Title:</h3>
          <p>{title}</p>
        </div>
        <div className=" flex flex-row">
          <h3 className="font-semibold pr-3">Video:</h3>
          <p>{video}</p>
        </div>
        <div className=" flex flex-row">
          <h3 className="font-semibold pr-3">Support:</h3>
          <p>{support}</p>
        </div>
        <div className=" flex flex-row">
          <h3 className="font-semibold pr-3">Poster:</h3>
          <p>{poster}</p>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
