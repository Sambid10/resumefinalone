import { EditorFormProps } from '@/lib/types'
import { SummarySchema, summaryValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from '@/components/ui/input'
import { useRef,useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
export default function SummaryForm({resumeData,setResumeData}:EditorFormProps) {
    const triggerTimeout = useRef<NodeJS.Timeout | null>(null);
    const form=useForm<summaryValues>({
        resolver:zodResolver(SummarySchema),
        defaultValues:{
            summary:resumeData.summary || ""
        }
    })
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
      <h1 
    
      className="text-center font-semibold text-2xl">
        Summary
      </h1>
      <p className="text-sm text-gray-500 text-center">
        Write a short introduction to your resume.
      </p>
      <div className="max-w-xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={(e) =>e.preventDefault() }
            className="flex flex-col gap-4 mt-6"
          >
            <FormField
              name="summary"
              control={form.control}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                    Summary :
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      autoFocus
                      {...field}
                     
                      placeholder="A brief text about yourself."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
      </div>
    </div>
  )
}
