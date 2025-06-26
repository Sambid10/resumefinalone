import { Metadata } from "next";
import React from "react";
import ResumeEditor from "./ResumeEditor";
import { setDate } from "date-fns";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ResumeDataInclude } from "@/lib/types";
interface Props {
  searchParams: Promise<{ resumeId: string }>;
}
export const metadata: Metadata = {
  title: "Design your Resumes",
};
export default async function Editorpage({ searchParams }: Props) {
  const { resumeId } = await searchParams;
  const { userId } = await auth();
  if (!userId) return null;

  const resumeToedit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include:ResumeDataInclude,
      })
    : null;

  return (
    <div className="font-roboto relative z-30 w-full">
      <ResumeEditor 
      resumeToEdit={resumeToedit}
      />
    </div>
  );
}
