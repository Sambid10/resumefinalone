"use server";

import prisma from "@/lib/db";
import { del, put } from "@vercel/blob";
import { ResumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import path from "path";
export async function saveResume(values: ResumeValues) {
  const { id } = values;
  console.log(values);

  const { photo, workExperiences, educations, projects,...resumeValues } =
    ResumeSchema.parse(values);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;
  if (id && !existingResume) throw new Error("Resume not found..");

  let newPhotoUrl: string | undefined | null = undefined;
  if (photo instanceof File) {
   
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    const blob = await put(
      `resume_photos/${path.extname(photo.name)}}`,
      photo,
      { access: "public" ,addRandomSuffix:true},
      
    );
    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
       
        photoUrl: newPhotoUrl,
        workExperience:{
          deleteMany:{},
          create:workExperiences?.map((exp)=>({
            ...exp,
            startDate:exp.startDate ? new Date(exp.startDate) :undefined,
            endDate:exp.endDate ? new Date(exp.endDate) :undefined
          }))
        },
        education:{
          deleteMany:{},
          create:educations?.map((edu)=>({
            ...edu,
            startDate:edu.startDate ? new Date(edu.startDate) :undefined,
            endDate:edu.endDate ? new Date(edu.endDate) :undefined
          }))
        },
        project:{
          deleteMany:{},
          create:projects?.map((pro)=>({
            ...pro,
            startDate:pro.startDate ?new Date(pro.startDate) : undefined,
            endDate:pro.endDate ? new Date(pro.endDate) :undefined
          }))
        },
        updatedAt:new Date()
       
      },
    });
  }else{
    return prisma.resume.create({
      data:{
        ...resumeValues,
        userId,
        education:{
          create:educations?.map((edu)=>({
            ...edu,
            startDate:edu.startDate ? new Date(edu.startDate) :undefined,
            endDate:edu.endDate ? new Date(edu.endDate) :undefined
          }))
        },
        workExperience:{
          create:workExperiences?.map((exp)=>({
            ...exp,
            startDate:exp.startDate ? new Date(exp.startDate) :undefined,
            endDate:exp.endDate ? new Date(exp.endDate) :undefined
          }))
        }
      }
    })
  }
}
