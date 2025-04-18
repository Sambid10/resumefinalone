"use client"
import { EditorFormProps } from "@/lib/types";
import { skillsSchema, skillValues } from "@/lib/validation";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
export default function SkillsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<skillValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });
  const triggerTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const subscription = form.watch((values) => {
      // Clear any existing timeout before starting a new one.
      if (triggerTimeout.current) {
        clearTimeout(triggerTimeout.current);
      }
      triggerTimeout.current = setTimeout(async () => {
        try {
          const isValid = await form.trigger();
          if (!isValid) return;

          // Merge the current resumeData with the new form values
          setResumeData({
            ...resumeData,
            skills:
              values.skills
                ?.filter((exp) => exp !== undefined)
                .map((exp) => exp.trim())
                .filter((exp) => exp !== "") || [],
          });
        } catch (error) {
          console.error("Validation trigger error:", error);
        }
      }, 300); // Debounce delay (300ms)
    });

    return () => {
      // Clean up: clear the timeout and unsubscribe from the watch.
      if (triggerTimeout.current) {
        clearTimeout(triggerTimeout.current);
      }
      subscription.unsubscribe();
    };
  }, [form, resumeData, setResumeData]);
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">
        Skills / Technical Skills
      </h1>
      <p className="text-sm text-gray-500 text-center">
        Tell us what you're good at.
      </p>
      <div className="max-w-xl mx-auto">
        <Form {...form}>
          <form
             onSubmit={(e) =>e.preventDefault() }
            className="flex flex-col gap-4 mt-6"
          >
            <FormField
              name="skills"
              control={form.control}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                    Skills :
                  </FormLabel>
                  <FormControl>
                    <Textarea
                    autoFocus
                      className="peer:"
                      {...field}
                      placeholder="eg: ReactJs,Prisma,Express,Python,Flask..."
                      onChange={(e)=>{

                        const skills=e.target.value.split(",")
                        field.onChange(skills)
                    }
                      }
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="flex justify-end"> 
                    Enter just like said in placeholder each skill seperated by comma.
                  </FormDescription>
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
      </div>
    </div>
  );
}
