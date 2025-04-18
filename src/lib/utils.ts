import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData } from "./types";
import { ResumeValues } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function FileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    name: data.name || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    country: data.country || undefined,
    linkedinUrl:data.linkedinUrl || undefined,
    websiteUrl:data.websiteUrl || undefined,
    githubUrl:data.githubUrl || undefined,
    city: data.city || undefined,
    workExperiences: data.workExperience.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      startDate: exp.startDate?.toISOString().split("T")[0],
      endDate:exp.endDate?.toISOString().split("T")[0],
      description:exp.description || undefined

    })),
    projects:data.project.map((pro)=>({
      projectName:pro.projectName || undefined,
      startDate: pro.startDate?.toISOString().split("T")[0],
      endDate:pro.endDate?.toISOString().split("T")[0],
      projectDescription:pro.projectDescription || undefined,
      projectSubDescription:pro.projectSubDescription || undefined
    })),
    educations:data.education.map((edu)=>({
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate:edu.endDate?.toISOString().split("T")[0],
      degreeName:edu.degreeName || undefined,
      gpa:edu.gpa || undefined,
      institutionName:edu.institutionName || undefined,
      universityName:edu.universityName || undefined
    })),
    colorHex:data.colorHex,
    borderStyle:data.borderStyle,
    skills:data.skills,
    summary:data.summary || undefined
  };
}
