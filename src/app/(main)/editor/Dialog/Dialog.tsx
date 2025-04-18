import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
export default function DialogBox({remove,index}:{
    remove:(index:number)=>void
    index:number
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
              variant={"destructive"}
              type="button"
              className=" flex items-center gap-2 cursor-pointer "
            >
              <X className="size-3" />
              Remove
            </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="text-left text-gray-400">
            This will delete your
            information from the form.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-4">
     
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
          onClick={()=>remove(index)}
          type="button" className="cursor-pointer" variant="destructive">

             Ok
            </Button>
        </DialogFooter>
      </DialogContent>
    
    </Dialog>
  );
}
