"use client";
// import { Layout } from "@/app/(main)/editor/ResumePreviewSection";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInputIcon } from "lucide-react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Layout, useLayoutStore } from "@/zustand/layoutstore";
import Image from "next/image";

import { ResumeValues } from "@/lib/validation";
export default function LayoutStyleButton({resume}:{
  resume:ResumeValues
}) {
   
  const [dialogopen, setDialogopen] = useState(false);
  return (
    <div>
      <Button
        title="Change Border Radius"
        size={"icon"}
        onClick={() => setDialogopen(true)}
        className="bg-[#121212] text-gray hover:bg-black"
      >
        <FormInputIcon className="size-5" />
      </Button>
      <LayoutChooserDialog
      resumeData={resume}
        dialogopen={dialogopen}
        setDialogopen={setDialogopen}
      />
    </div>
  );
}
function LayoutChooserDialog({
  dialogopen,
  resumeData,
  setDialogopen,
}: {
  dialogopen: boolean;
  resumeData:ResumeValues
  setDialogopen: (dialogopen: boolean) => void;
}) {
    const {layouts,setLayout}=useLayoutStore()
    function setResumeLayout(layout:Layout){
            setLayout(resumeData.id!,layout)
            setDialogopen(false)
    }
    const currentLayout:Layout=layouts[resumeData.id!] ?? "Modern"
  return (
    <>
      <Dialog open={dialogopen} onOpenChange={setDialogopen}>
        <DialogContent className="sm:max-w-[700px] sm:h-[70vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Change Layout ?</DialogTitle>
            <DialogDescription className="text-gray-400">
              Make changes to your resume layout here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 h-96 w-full px-6 ">
            <div 
            onClick={()=>setResumeLayout("Classic")}
            className={`h-full w-full relative rounded-xl hover:bg-zinc-700 transition-colors ease-in duration-200  bg-[#121212] cursor-pointer  ${currentLayout === "Classic" ? "border-3 border-blue-400" :"border-stone-200 border"}`}>
              <Image
              fill
              alt="resume-layout-pic"
              className="object-contain py-3"
              src="/classiclay.png"
              />
            </div>
            <div 
            onClick={()=>setResumeLayout("Modern")}
            className={`h-full w-full relative rounded-xl  bg-[#121212] cursor-pointer hover:bg-zinc-700 transition-colors ease-in duration-200 ${currentLayout === "Modern" ? "border-3 border-blue-400" :"border-stone-200 border"}`}>
              <Image
              fill
              alt="resume-layout-pic"
              className="object-contain py-3"
              src="/modern.png"
              />
                
            </div>
          </div>
          <DialogFooter>
            <Button 
            className="flex items-center"
            onClick={()=>setDialogopen(false)}
            variant={"destructive"} type="button">
               <X className="size-3" />
               Close
               </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
