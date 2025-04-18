"use client";
import { personalinfoSchema, personalinfoValues } from "@/lib/validation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EditorFormProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
export default function PersonalInfoForm({resumeData,setResumeData}:EditorFormProps) {   
 
 
    const form = useForm<personalinfoValues>({
    resolver: zodResolver(personalinfoSchema),
    defaultValues: {
      city: resumeData.city || "",
      country: resumeData.country || "",
      email: resumeData.email || "",
      firstName: resumeData.firstName ||"",
      jobTitle: resumeData.jobTitle || "",
      lastName: resumeData.lastName || "",
      phone: resumeData.phone || "",
      githubUrl:resumeData.githubUrl || "",
      linkedinUrl:resumeData.linkedinUrl || "",
      websiteUrl:resumeData.websiteUrl || ""

    },
  });
  const triggerTimeout = useRef<NodeJS.Timeout | null>(null);
  const profilephotoref=useRef<HTMLInputElement>(null)

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
        Personal Information.
      </h1>
      <p className="text-sm text-gray-500 text-center">
        Enter your personal information here..
      </p>
      <div className="max-w-xl mx-auto">
        <Form {...form}>
          <form
           onSubmit={(e) =>e.preventDefault() }
          className="flex flex-col gap-4 mt-6">
            <FormField
              name="photo"
              control={form.control}
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                    Your Photo :
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                    <Input
                      {...fieldValues}
                      ref={profilephotoref}
                      autoFocus
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                     
                    />
                     <Button 
                  type="button"
                  onClick={()=>
                    {fieldValues.onChange(null)
                      profilephotoref.current && (
                        profilephotoref.current.value = ""
                      )
                  }}
                  className="bg-red-600 hover:bg-red-600 text-white">Remove</Button>
                    </div>
                  
                  </FormControl>
                 
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="group-focus-within:text-blue-300">
                      First Name :
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="peer:"
                        {...field}
                        type="text"
                        placeholder="Enter your first name"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="group-focus-within:text-blue-300">
                      Last Name :
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="peer:"
                        {...field}
                        type="text"
                        placeholder="Enter your last name."
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <FormField
              name="jobTitle"
              control={form.control}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                    Job Title :
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="peer:"
                      {...field}
                      type="text"
                      placeholder="Enter your job title"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="group-focus-within:text-blue-300">
                      City :
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="peer:"
                        {...field}
                        type="text"
                        placeholder="Enter your city"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                name="country"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="group-focus-within:text-blue-300">
                      Country :
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="peer:"
                        type="text"
                        {...field}
                        placeholder="Enter your country"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                    Phone no :
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="peer:"
                      {...field}
                      type="text"
                      placeholder="Enter your phone no"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                   Email Address :
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="peer:"
                      type="email"
                      {...field}
                      placeholder="Enter your email"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
             <FormField
              name="websiteUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                   Portfolio/Personal website:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="peer:"
                      type="text"
                      {...field}
                      placeholder="Enter your Portfolio/Personal website"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
             <FormField
              name="linkedinUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                   Linkedin url:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="peer:"
                      type="text"
                      {...field}
                      placeholder="Enter your linkedin url"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="githubUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                   Github url:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="peer:"
                      type="text"
                      {...field}
                      placeholder="Enter your github url"
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
  );
}
