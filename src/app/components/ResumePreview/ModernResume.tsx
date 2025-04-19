"use client";
import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { Globe } from "lucide-react";
interface Props {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}
import { useRef } from "react";
import { BorderStyles } from "@/app/(main)/editor/forms/BorderStyleButton";
import { LocateFixedIcon, Mail, Map, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
export default function ModernResumePreview({
  resumeData,
  className,
  contentRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useDimension(containerRef);
  const { colorHex, borderStyle } = resumeData;
  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-white text-black w-full h-full aspect-[210/297] overflow-auto modern print-container font-sans",
        className
      )}
    >
      <div
        ref={contentRef}
        id="resumePreviewContent"
        className={cn(
          "grid grid-cols-[35%_65%] h-full print-page", // Full height grid layout
          !width && "invisible"
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <div
          style={{ backgroundColor: colorHex }}
          className="p-4 h-full" // Ensure the left side takes full height
        >
          <LeftSidePreviewSection resumeData={resumeData} />
        </div>

        <div className="px-6 h-full">
          <RightResumePreviewSection resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}
function LeftSidePreviewSection({ resumeData }: ResumeSectionProps) {
  const {
    city,
    photo,
    country,
    colorHex,
    borderStyle,
    educations,
    phone,
    email,
    skills,
    githubUrl,
    websiteUrl,
    linkedinUrl,
  } = resumeData;
  const [photoSrc, setphotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) {
      setphotoSrc(objectUrl);
    }
    if (photo === null) setphotoSrc("");
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [photo]);
  return (
    <div className=" flex flex-col items-start gap-6 flex-wrap ">
      {photoSrc && (
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
          width={150}
          height={150}
          alt="author puc"
          className="aspect-square object-cover mx-auto border-4 border-gray-300"
        />
      )}
      <div className="space-y-2.5 mt-6 w-full ">
        <h1 className="text-3xl font-semibold text-white uppercase tracking-wider">
          Contact
        </h1>
        <div className="h-[0.15rem]  w-full bg-white" />
        <div className="flex flex-col leading-snug gap-1">
          {phone && (
            <span
              style={{ color: colorHex }}
              className="text-base font-normal flex items-center gap-3 "
            >
              <Phone className="text-white size-4" />
              <h1 className="text-gray-300">{phone}</h1>
            </span>
          )}
          {email && (
            <span
              style={{ color: colorHex }}
              className="text-base font-normal flex items-center  flex-wrap gap-4 "
            >
              <Mail className="text-white size-4" />
              <h1 className="text-gray-300">{email}</h1>
            </span>
          )}
          {websiteUrl && (
            <span
              style={{ color: colorHex }}
              className="text-base font-normal flex items-center  flex-wrap gap-4 "
            >
              <Globe className="text-white size-4" />
              <h1 className="text-gray-300">{websiteUrl}</h1>
            </span>
          )}
          {githubUrl && (
            <span
              style={{ color: colorHex }}
              className="text-base font-normal flex items-center  flex-wrap gap-4 "
            >
              <FaGithub className="text-white size-4" />
              <h1 className="text-gray-300">{githubUrl}</h1>
            </span>
          )}
          {linkedinUrl && (
            <span
              style={{ color: colorHex }}
              className="text-base font-normal flex items-center  flex-wrap gap-4 "
            >
              <FaLinkedin className="text-white size-4" />
              <h1 className="text-gray-300">{linkedinUrl}</h1>
            </span>
          )}

          {city || country ? (
            <span className="text-base font-normal flex items-center  flex-wrap gap-4 ">
              <MapPin className="text-white size-4" />
              <p className="text-base leading-snug text-gray-300">
                {city}
                {city && country ? ", " : ""}
                {country}
              </p>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="space-y-2.5 mt-6 w-full break-inside-avoid">
        <h1 className="text-3xl font-semibold text-white uppercase tracking-wider">
          Education
        </h1>
        <div className="h-[0.15rem] bg-white w-full" />
        <div className="flex flex-col gap-4">
          {educations?.map((edu, i) => (
            <span key={i} className="text-gray-300  text-base">
              {edu.startDate && (
                <div>
                  {formatDate(edu.startDate, "yyyy")} -{" "}
                  {edu.endDate ? formatDate(edu.endDate, "yyyy") : "Present"}
                </div>
              )}

              <h1 className="font-semibold leading-snug">
                {edu.universityName}
              </h1>
              <h1 className="font-semibold  leading-snug">
                {edu.institutionName}
              </h1>
              <div className="relative">
                <h1 className="absolute left-0">•</h1>
                <h1 className="ml-4">{edu.degreeName}</h1>
              </div>
              <div className="relative">
                <h1 className="absolute left-0">•</h1>
                <h1 className="ml-4">{edu.gpa}</h1>
              </div>
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2.5 mt-6 w-full">
        <h1 className="text-3xl font-semibold text-white uppercase tracking-wider">
          Skills
        </h1>
        <div className="h-[0.15rem] bg-white w-full" />
        <div className="flex flex-col">
          {skills?.map((skill) =>
            skill.split(",").map((skill, i) => (
              <div
                key={i}
                className="relative font-normal  leading-snug text-gray-300"
              >
                <h1 className="absolute left-0">•</h1>
                <h1 className="ml-4">{skill}</h1>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function RightResumePreviewSection({ resumeData }: ResumeSectionProps) {
  const {
    firstName,
    lastName,
    jobTitle,
    workExperiences,
    summary,
    colorHex,
    projects,
    references,
  } = resumeData;

  const projectisnotEmpty = projects?.filter(
    (pro) => Object.values(pro).filter(Boolean).length > 0
  );
  const workexpereienceisnotEmpty = workExperiences?.filter(
    (work) => Object.values(work).filter(Boolean).length > 0
  );
  const refrencesisnotEmpty = references?.filter(
    (ref) => Object.values(ref).filter(Boolean).length > 0
  );

  return (
    <div className="flex flex-col gap-11 ">
      <div className="pt-14 flex  justify-start pl-8">
        <div className="flex flex-col gap-2">
          <span className=" text-5xl font-bold flex items-center gap-4">
            <h1 style={{ color: colorHex }}>{firstName} </h1>{" "}
            <h1 className="font-normal">{lastName}</h1>{" "}
          </span>
          <h1 className="text-2xl">{jobTitle}</h1>
          <div
            style={{ backgroundColor: colorHex }}
            className="w-[30%] h-[0.20rem] bg-black"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-4">
        <div className=" break-inside-avoid">
          <h1
            style={{ color: colorHex }}
            className="text-3xl font-semibold tracking-wider"
          >
            PROFILE
          </h1>
          <div className="w-full h-[0.09rem] mt-2 bg-gray-500" />
          <div className="whitespace-pre-line text-sm font-normal mt-2 tracking-wide">
            <h1 className="text-gray-700 leading-snug text-sm">{summary}</h1>
          </div>
        </div>
        <div>
          <h1
            style={{ color: colorHex }}
            className="text-3xl font-semibold tracking-wider  "
          >
            WORK EXPERIENCE
          </h1>
          <div className="w-full h-[0.09rem] mt-2 bg-gray-500" />
          {workexpereienceisnotEmpty?.map((exp, i) => (
            <div
              key={i}
              className="text-base mt-2 flex flex-col break-inside-avoid"
            >
              <div className="flex justify-between ">
                <h1 className="font-semibold">{exp.company}</h1>
                {exp.startDate && (
                  <span className="flex  items-center gap-1">
                    <h1>{formatDate(exp.startDate, "yyyy")} - </h1>
                    <h1>
                      {exp.endDate
                        ? formatDate(exp.endDate, "yyyy")
                        : "Present"}
                    </h1>
                  </span>
                )}
              </div>
              <div>
                <h1>{exp.position}</h1>
              </div>
              <div>
                <h1 className="whitespace-pre-line">
                  <ul className="list-disc pl-5 mb-4">
                    {exp.description
                      ?.split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((line, i) => (
                        <div
                          key={i}
                          className="relative pl-5 text-sm text-gray-700 leading-snug py-[0.11rem]"
                        >
                          <span className="absolute left-0">•</span>
                          {line}
                        </div>
                      ))}
                  </ul>
                </h1>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h1
            style={{ color: colorHex }}
            className="text-3xl font-semibold tracking-wider uppercase"
          >
            Project
          </h1>
          <div className="w-full h-[0.09rem] mt-2 bg-gray-500" />
          {projectisnotEmpty?.map((pro, i) => (
            <div
              key={i}
              className="text-base mt-2 flex flex-col break-inside-avoid"
            >
              <div className="flex items-start justify-between   ">
                <h1 
                style={{lineHeight:"130%"}}
                className="font-semibold">{pro.projectName}</h1>
                {pro.startDate && (
                  <span className="flex justify-end w-[30%] items-start  gap-1">
                    <h1>{formatDate(pro.startDate, "yyyy")} - </h1>
                    <h1>
                      {pro.endDate
                        ? formatDate(pro.endDate, "yyyy")
                        : "Present"}
                    </h1>
                  </span>
                )}
              </div>
              <div className="mt-1">
                <h1>
                  {pro.projectSubDescription
                    ?.split("\n")
                    .filter((line) => line !== " ")
                    .map((line, i) => (
                      <span
                        key={i}
                        style={{ lineHeight: "130%" }}
                        className="leading-relaxed text-sm text-gray-700"
                      >
                        <h1>{line}</h1>
                      </span>
                    ))}
                </h1>
              </div>
              <div>
                <h1 className="whitespace-pre-line">
                  <ul className="list-disc pl-5 mb-4 mt-0">
                    {pro.projectDescription
                      ?.split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((line, i) => (
                        <div
                          key={i}
                          className="relative pl-5 text-sm text-gray-700 leading-snug"
                        >
                          <span className="absolute left-0">•</span>
                          {line}
                        </div>
                      ))}
                  </ul>
                </h1>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-12">
          <h1
            style={{ color: colorHex }}
            className="text-3xl font-semibold tracking-wider uppercase"
          >
            Reference
          </h1>
          <div className="w-full h-[0.09rem] mt-2 bg-gray-500 "  />
          {refrencesisnotEmpty?.map((refe, i) => (
            <div
              key={i}
              className="text-base mt-2 flex  flex-col break-inside-avoid"
            >
              <div key={i} className="space-y-2 break-inside-avoid ">
                <div className="flex flex-col leading-tight">
                  <h1 className="font-semibold ">{refe.personName}</h1>

                  <div className="flex items-center font-semibold text-sm">
                    <h1>{refe.organizationName}</h1>
                    {refe.phoneNo && refe.emailAddress ? "," : ""}
                    <h1 className="ml-1">{refe.location}</h1>
                  </div>
                  <div className="mt-[2px] text-gray-700 text-sm">
                    {refe.phoneNo && <h1>Phone no: {refe.phoneNo}</h1>}

                    {refe.emailAddress && (
                      <h1 className="">Email Address: {refe.emailAddress}</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
