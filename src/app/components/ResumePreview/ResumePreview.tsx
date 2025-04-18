"use client";
import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface Props {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}
import { useRef } from "react";
import { BorderStyles } from "@/app/(main)/editor/forms/BorderStyleButton";
import { Mail, Phone, Skull } from "lucide-react";
export default function ClassicResumePreview({
  resumeData,
  className,
  contentRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useDimension(containerRef);
  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-white  text-black h-fit w-full aspect-[210/297] font-sans",
        className
      )}
    >
      <div
        ref={contentRef}
        id="resumePreviewContent"
        className={cn("space-y-6 p-6 leading-relaxed", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
          fontFamily: "serif",
        }}
      >
        <PersonalPreviewSection resumeData={resumeData} />
        <SummaryPreviewSection resumeData={resumeData} />
        <EducationSectionPreview resumeData={resumeData} />
        <WorkExperiencePreviewSection resumeData={resumeData} />
        <ProjectPreviewSection resumeData={resumeData} />
        <SkillsPreviewSection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}
function PersonalPreviewSection({ resumeData }: ResumeSectionProps) {
  const {
    city,
    photo,
    country,
    firstName,
    lastName,
    colorHex,
    borderStyle,
    jobTitle,
    phone,
    email,
  } = resumeData;
  // const [photoSrc, setphotoSrc] = useState(photo instanceof File ? "" : photo);

  // useEffect(() => {
  //   const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
  //   if (objectUrl) {
  //     setphotoSrc(objectUrl);
  //   }
  //   if (photo === null) setphotoSrc("");
  //   return () => {
  //     URL.revokeObjectURL(objectUrl);
  //   };
  // }, [photo]);
  return (
    /* {photoSrc && (
        <Image
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                ? "999px"
                : "10%",
          }}
          src={photoSrc}
          width={100}
          height={100}
          alt="author puc"
          className="aspect-square object-cover"
        />
      )} */
    <div className="space-y-2.5 w-full ">
      <div className="space-y-1 flex justify-center flex-col items-center w-full">
        <p
          style={{ color: colorHex }}
          className="text-4xl font-bold capitalize text-center"
        >
          {firstName} {lastName}
        </p>
        <p
          style={{
            lineHeight: "50%",
          }}
          className="text-[16px] mt-2"
        >
          {city}
          {city && country ? ", " : ""}
          {country}
        </p>
        <span className="flex items-center gap-2">
          {email && (
            <div className="flex items-center underline underline-offset-2 text-[16px] gap-1">
              <Mail className="size-3" />
              {email}
            </div>
          )}
          {phone && (
            <div className="flex items-center underline underline-offset-2 text-[16px] gap-2">
              <Phone className="size-3" />
              {phone}
            </div>
          )}
        </span>
        {/* <p style={{ color: colorHex }} className="font-medium">
          {jobTitle}
        </p> */}
      </div>
    </div>
  );
}

function WorkExperiencePreviewSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

  const workExperienceNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );

  if (!workExperienceNotEmpty?.length) return null;

  return (
    <div className="space-y-2 text-base ">
      <span style={{ color: colorHex }} className="text-xl font-semibold">
        <p className="uppercase tracking-wider text-2xl font-bold ">
          Work Experience
        </p>
        <hr
          style={{ borderColor: colorHex }}
          className="border-[0.10rem] mb-1 border-gray-400"
        />
      </span>

      {workExperienceNotEmpty.map((exp, i) => (
        <div key={i} className="space-y-1 break-inside-avoid">
          <div className="text-base flex flex-col font-semibold">
            <span className="flex items-center justify-between">
              <p className="text-base font-semibold">{exp.company}</p>
              {exp.startDate && (
                <span className="flex items-center gap-1">
                  <h1 className="font-semibold text-sm tracking-wider">
                    {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  </h1>
                  <h1 className="font-semibold text-sm tracking-wider">
                    {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                  </h1>
                </span>
              )}
            </span>
            <h1 className="-mt-1 italic">{exp.position}</h1>
            <div className="text-base whitespace-pre-line">
              <h1 className="font-normal ml-4">
                {exp.description
                  ?.split("\n")
                  .filter((line) => line !== "")
                  .map((line, i) => (
                    <span key={i} className="relative tracking-normal leading-snug">
                      <h1 className="absolute left-0">•</h1>
                      <h1 className="ml-4">{line}</h1>
                    </span>
                  ))}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationSectionPreview({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;
  const educationisnotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );
  if (!educationisnotEmpty?.length) return null;

  return (
    <div className="space-y-2 ">
      <span style={{ color: colorHex }} className="text-xl font-semibold">
        <p className="uppercase  tracking-wider text-2xl font-bold">
          Education
        </p>
        <hr
          style={{ borderColor: colorHex }}
          className="border-[0.10rem]  mb-1 border-gray-400"
        />
      </span>

      {educationisnotEmpty.map((edu, i) => (
        <div key={i} className="space-y-1 break-inside-avoid">
          <div className="text-sm flex justify-between items-start">
            <div className="flex flex-col leading-relaxed">
              <span className="flex items-center gap-1 text-base font-semibold">
                <h1>
                  {edu.institutionName} {edu.institutionName && ","}
                </h1>
                <h1 className="font-semibold"> {edu.universityName}</h1>
              </span>
              <span className="flex items-center gap-1 -mt-1 text-base">
                <h1 className="italic font-normal ">{edu.degreeName}</h1>
                {edu.gpa && "-"} <p className="font-semibold">{edu.gpa}</p>
              </span>
            </div>
            {edu.startDate && (
              <span className="flex items-center gap-1">
                <h1 className="font-semibold tracking-wider">
                  {formatDate(edu.startDate, "MM/yyyy")} - {""}
                </h1>
                <h1 className="font-semibold tracking-wider">
                  {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : "Present"}
                </h1>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectPreviewSection({ resumeData }: ResumeSectionProps) {
  const { projects, colorHex } = resumeData;
  const projectisnotEmpty = projects?.filter(
    (pro) => Object.values(pro).filter(Boolean).length > 0
  );
  if (!projectisnotEmpty) return null;

  return (
    <div className="space-y-2 ">
      <span style={{ color: colorHex }} className="text-xl font-semibold">
        <p className="uppercase tracking-wider text-2xl font-bold">Project</p>
        <hr
          style={{ borderColor: colorHex }}
          className="border-[0.10rem]  mb-1 border-gray-400"
        />
      </span>

      {projectisnotEmpty.map((pro, i) => (
        <div key={i} className="space-y-1 break-inside-avoid">
          <div className="text-sm flex justify-between items-start">
            <div className="flex flex-col leading-relaxed w-full">
              <div className="flex flex-col leading-relaxed w-full">
                <span className="flex items-center justify-between w-full gap-1 text-base font-semibold">
                  <h1> {pro.projectName}</h1>
                  {pro.startDate && (
                    <span className="flex items-center gap-1">
                      <h1 className="font-semibold tracking-wider text-sm">
                        {formatDate(pro.startDate, "MM/yyyy")} - {""}
                      </h1>
                      <h1 className="font-semibold tracking-wider text-sm">
                        {pro.endDate ? formatDate(pro.endDate, "MM/yyyy") : "Present"}
                      </h1>
                    </span>
                  )}
                </span>
                <div className="text-base whitespace-pre-line -mt-[2px]">
                  {pro.projectSubDescription
                    ?.split("\n")
                    .filter((line) => line !== "")
                    .map((line, i) => (
                      <span key={i}>
                        <h1 key={i} className="text-base font-medium leading-tight">
                          {line}
                        </h1>
                      </span>
                    ))}
                </div>
              </div>
              <div className="text-base whitespace-pre-line mt-1">
                <h1 className="font-normal ml-4">
                  {pro.projectDescription
                    ?.split("\n")
                    .filter((line) => line !== "")
                    .map((line, i) => (
                      <span key={i} className="relative tracking-normal leading-snug">
                        <h1 className="absolute left-0">•</h1>
                        <h1 className="ml-4">{line}</h1>
                      </span>
                    ))}
                </h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
function SkillsPreviewSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex } = resumeData;
  if (!skills?.length) return null;

  return (
    <div className="space-y-2 break-inside-avoid">
      <span style={{ color: colorHex }} className="text-xl font-semibold">
        <p className="uppercase tracking-wider text-2xl font-bold">SKILLS</p>
        <hr
          style={{ borderColor: colorHex }}
          className="border-[0.10rem]  mb-1 border-gray-400"
        />
      </span>
      <div className="flex flex-wrap gap-4 break-inside-avoid">
        {skills
          .flatMap((skill) => skill.split(","))
          .filter((s) => s.trim() !== "")
          .map((skill, i) => (
            <span key={i} className="flex items-center gap-1 tracking-normal leading-snug">
              <span className="text-lg">•</span>
              <span className="text-base font-medium">{skill.trim()}</span>
            </span>
          ))}
      </div>
    </div>
  );
}

function SummaryPreviewSection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <div className="space-y-2 break-inside-avoid">
        <span style={{ color: colorHex }} className="text-xl font-semibold">
          <p className="uppercase tracking-wider text-2xl font-bold">PROFILE</p>
          <hr
            style={{ borderColor: colorHex }}
            className="border-[0.10rem]  mb-1 border-gray-400"
          />
        </span>
        <div className="whitespace-pre-line text-base leading-snug">
          {summary}
        </div>
      </div>
    </>
  );
}
