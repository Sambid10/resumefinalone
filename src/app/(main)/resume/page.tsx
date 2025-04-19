import React from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Plus, PlusSquare, PlusSquareIcon } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ResumeDataInclude } from "@/lib/types";
import ResumeItems from "./ResumeItems/ResumeItems";
export const metadata: Metadata = {
  title: "Your Resumes",
};
export default async function Resumepage() {
  const { userId } = await auth();
  if (!userId) return null;
  const [resume, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId: userId,
      },
      include: ResumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId: userId,
      },
    }),
  ]);

  return (
    <div className="px-6 xl:px-0 pt-6  w-full mx-auto max-w-7xl font-roboto relative z-30">
         <div className=" absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="w-full flex justify-center mb-5">
        <Button asChild className="mx-auto relative z-10 ">
          <Link href={"/editor"}>
            <Plus className="size-4" />
            <h1>New Resume</h1>
          </Link>
        </Button>
      </div>

      <div className="">
        <div className="flex items-center justify-between pb-4 px-4 relative z-30">
          <h1 className="text-3xl "> Your Resumes</h1>
          <p> Total : {totalCount}</p>
        </div>

        <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 pb-6 w-full gap-6">
          {resume.map((resume) => (
            <ResumeItems key={resume.id} resume={resume} />
          ))}
        </div>
      </div>
    </div>
  );
}
