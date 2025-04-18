"use client";
import Footer from "./Footer";
import React, { useState } from "react";
import BreadCrumbs from "./steps/BreadCrumb";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps/steps";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { useAutoSaveResume } from "@/hooks/useAutoSaveResume";
import { useUnloadWarning } from "@/hooks/useUnloadWarining";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
interface ResumeEditorProps{
  resumeToEdit:ResumeServerData | null
}

export default function ResumeEditor({resumeToEdit}:ResumeEditorProps) {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;
  const [resumeData,setResumeData]=useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {}
  );
  function setStep(key: string) {
    const newsearchParams = new URLSearchParams(searchParams);
    newsearchParams.set("step", key);
    window.history.pushState(null, "", `?${newsearchParams.toString()}`);
  }
  const {hasunsavedChange,isSaving}=useAutoSaveResume(resumeData)
  useUnloadWarning(hasunsavedChange)
  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;
  return (
    <div className="flex flex-col min-h-[100dvh] relative">
      {/* Header */}
      {/* <header className=" w-full h-24 bg-black border-b border-stone-700 z-20 flex items-center">
        <div className="text-center w-full flex flex-col gap-2 px-6 xl:px-0 max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-white">
            Design your Resumes
          </h1>
          <h1 className="text-sm text-gray-400 -mt-1">
            Follow the steps below to create your resumes. Your progress will be
            saved automatically.
          </h1>
        </div>
      </header> */}

      {/* Main content area */}
      <main className="mb-16 flex-1 flex px-6 xl:px-0 max-w-7xl mx-auto w-full ">
        <div className="flex flex-col lg:flex-row flex-1 w-full ">
          {/* Left */}

          <div className=" p-4 overflow-y-auto border-stone-700 w-full h-[calc(100dvh-64px)] ">
            <div>
              <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
            </div>
            {FormComponent && <FormComponent resumeData={resumeData} setResumeData={setResumeData}/>}
          </div>
          {/* Right */}
          <div className="p-4 overflow-y-auto border-t lg:border-t-0 lg:border-l border-stone-700 w-full h-[calc(100dvh-64px)] ">
           <ResumePreviewSection resumeData={resumeData} setResumeData={setResumeData}/>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer isSaving={isSaving} currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
}
