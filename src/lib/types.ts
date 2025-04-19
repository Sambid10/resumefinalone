import { Prisma } from "@prisma/client";
import { ResumeValues } from "./validation";

export interface EditorFormProps{
    resumeData:ResumeValues,
    setResumeData:(data:ResumeValues)=>void
}


export const ResumeDataInclude={
    workExperience: true, education: true,project:true, reference:true
}satisfies Prisma.ResumeInclude
export type ResumeServerData=Prisma.ResumeGetPayload<{include:typeof ResumeDataInclude}>