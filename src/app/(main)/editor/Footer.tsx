import React from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, MoveLeft, MoveRight, X } from "lucide-react";
import Link from "next/link";
import { steps } from "./steps/steps";
interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  isSaving: boolean;
}
export default function Footer({
  currentStep,
  setCurrentStep,
  isSaving,
}: FooterProps) {
  const previousstep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep
  )?.key;
  const nextstep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep
  )?.key;

  return (
    <footer className="fixed bottom-0 w-screen h-16 bg-black border-t border-stone-700 z-20">
      <div className="mx-auto max-w-7xl flex gap-4 items-center h-full px-6 xl:px-0 justify-between">
        <div className="flex gap-4 items-center">
          <Button
            type="button"
            disabled={!previousstep}
            onClick={
              previousstep ? () => setCurrentStep(previousstep) : undefined
            }
            variant="outline"
            className={`flex items-center`}
          >
            <h1>Previous</h1>
            <MoveLeft className="size-3" />
          </Button>
          <Button
            type="button"
            disabled={!nextstep}
            onClick={nextstep ? () => setCurrentStep(nextstep) : undefined}
            className={`flex items-center ${
              !nextstep ? "cursor-not-allowed" : ""
            }`}
          >
            <h1>Next</h1>
            <MoveRight className="size-3" />
          </Button>
        </div>
        <div className="flex items-center gap-6">
        {isSaving && (
          <span className="flex items-center gap-1">
            <LoaderCircle className="animate-spin text-blue-400" />
            Saving
          </span>
        )}
        <Button 
        type="button"
        asChild variant="destructive">
          <Link href="/resume" className="flex  items-center cursor-pointer">
            <X className="size-3" />
            <h1>Close</h1>
          </Link>
        </Button>
       
        </div>
      </div>
    </footer>
  );
}
