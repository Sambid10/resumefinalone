import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { steps} from "./steps";
interface BreadCrumbProps {
  currentStep: string;
  setCurrentStep: (newStep: string) => void;
}
export default function BreadCrumbs({
  currentStep,
  setCurrentStep,
}: BreadCrumbProps) {
  return (
    <div className="flex justify-center mt-3 mb-4">
      <Breadcrumb>
        <BreadcrumbList className="flex justify-center">
          {steps.map((step, i) => (
            <React.Fragment key={step.key} >
              <BreadcrumbItem>
                {step.key === currentStep ? (
                  <BreadcrumbPage className="text-blue-400 font-semibold">{step.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className="hover:text-gray-50 text-gray-400 cursor-pointer">
                    <button
                    onClick={()=>setCurrentStep(step.key)}
                    >
                        {step.title}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className="last:hidden"/>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
