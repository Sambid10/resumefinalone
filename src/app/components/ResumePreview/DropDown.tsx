"use client";
import React, { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, Printer, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Menu, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DeleteResume } from "@/app/(main)/resume/action";
export default function DropDown({ resumeid ,onPrintClick}: { resumeid: string ,onPrintClick:()=>void}) {
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  return (
    <div className="relative group">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="bg-black rounded-full transition-all duration-200 ease-in hover:bg-[#121212] border border-stone-700"
          >
            <Menu className="text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" sideOffset={8}>
          <DropdownMenuItem
            onClick={() => setshowDeleteDialog(true)}
            className="flex items-center gap-2 cursor-pointer  hover:bg-gray-200"
          >
            <Trash2 className="size-4 text-rose-400 " />
            <h1 className="">Delete</h1>
          </DropdownMenuItem>
          <DropdownMenuItem
          onClick={onPrintClick}
            className="flex items-center gap-2 cursor-pointer  hover:bg-gray-200"
          >
            <Printer className="size-4" />
            <h1 className="">Print</h1>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfiramtionDialog resumeId={resumeid} open={showDeleteDialog} onOpenChange={setshowDeleteDialog}/>
    </div> 
  );
}

function DeleteConfiramtionDialog({
  resumeId,
  open,
  onOpenChange,
}: {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isPending, startTranstion] = useTransition();
  function handleDelete() {
    startTranstion(async () => {
      try {
        await DeleteResume(resumeId);
      } catch (err) {
        toast.error("Sorry,Something bad happend..");
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="text-left text-gray-400">
            This will delete your resume from our server.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button onClick={()=>onOpenChange(false)} type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            type="button"
            className="cursor-pointer"
            variant="destructive"
          >
            {isPending ? <Loader2 className="animate-spin"/> : <h1>Ok</h1>}
       
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
