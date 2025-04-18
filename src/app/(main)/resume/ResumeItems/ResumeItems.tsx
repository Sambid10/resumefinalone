"use client";
import DropDown from "@/app/components/ResumePreview/DropDown";
import ModernResumePreview from "@/app/components/ResumePreview/ModernResume";
import ClassicResumePreview from "@/app/components/ResumePreview/ResumePreview";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { useLayoutStore } from "@/zustand/layoutstore";
import { formatDate } from "date-fns";
import Link from "next/link";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
interface Props {
  resume: ResumeServerData;
}
export default function ResumeItems({ resume }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { layouts, setLayout } = useLayoutStore();
  const currentLayout = layouts[resume.id!];
  const reacttoPrintFn = useReactToPrint({
    contentRef: contentRef,
    documentTitle: resume.name || "Resume",
  });

  const wasupdated = resume.updatedAt !== resume.createdAt;
  return (
    <div className="rounded-lg group relative bg-black border border-stone-600  transition-all ease-in duration-150 hover:border-stone-400 p-4  cursor-pointer">
      <div className="absolute right-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
        <DropDown resumeid={resume.id} onPrintClick={reacttoPrintFn} />
      </div>

      <Link
        href={`/editor?resumeId=${resume.id}`}
        className="inline-block w-full text-center"
      >
        <p className="font-semibold line-clamp-1">{resume.name || "No name"}</p>
        {resume.description ? (
          <p className="line-clamp-2 text-sm -mt-[2px]">{resume.description}</p>
        ) : (
          <p className="line-clamp-1 text-sm -mt-[2px]">No Description</p>
        )}
        <p className="text-xs text-gray-400 mt-2">
          {wasupdated ? "Updated" : "Created"} on {""}
          {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
        </p>
      </Link>
      <Link
        className="inline-block w-full mt-2 relative"
        href={`/editor?resumeId=${resume.id}`}
      >
        {currentLayout === "Classic" ? (
          <ClassicResumePreview
            contentRef={contentRef}
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden"
          />
        ) : (
          <ModernResumePreview
            contentRef={contentRef}
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-15 bg-gradient-to-t from-gray-600 to-transparent" />
      </Link>
    </div>
  );
}
