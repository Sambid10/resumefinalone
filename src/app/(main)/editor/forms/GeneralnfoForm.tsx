"use client"
import { generalinfoSchema, generalinfoValues } from "@/lib/validation";
import React,{useEffect} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
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
import { useRef } from "react";
import { EditorFormProps } from "@/lib/types";
export default function GeneralnfoForm({resumeData,setResumeData}:EditorFormProps) {

  const form = useForm<generalinfoValues>({
    resolver: zodResolver(generalinfoSchema),
    defaultValues: {
      name: resumeData.name || "",
      description: resumeData.description || "",
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
          setResumeData({ ...resumeData, ...values });
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
        General Information
      </h1>
      <p className="text-sm text-gray-500 text-center">
        This will not appear on your resume.
      </p>
      <div className="max-w-xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={(e) =>e.preventDefault() }
            className="flex flex-col gap-4 mt-6"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                    Resume Name :
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      {...field}
                      type="text"
                      placeholder="Enter your resume name.."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                    Resume Description :
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="peer:"
                      {...field}
                      placeholder="Enter resume description here.."
                    />
                  </FormControl>
                  <FormDescription className="flex justify-end text-gray-400">
                    Describe what this resume is for..
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
      </div>
    </div>
  );
}
