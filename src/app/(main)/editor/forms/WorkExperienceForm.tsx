import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { workExperienceSchema, workExperienceValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { EditorFormProps } from "@/lib/types";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {CSS} from "@dnd-kit/utilities"
import { cn } from "@/lib/utils";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GripHorizontal, X } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DialogBox from "../Dialog/Dialog";
import { Textarea } from "@/components/ui/textarea";
export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<workExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData?.workExperiences ?? [],
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
            workExperiences:
              values.workExperiences?.filter((exp) => exp !== undefined) || [],
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

  const { append, remove, fields, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldindex = fields.findIndex((field) => field.id === active.id);
      const newindex = fields.findIndex((field) => field.id === over.id);
      move(oldindex, newindex);
      return arrayMove(fields, oldindex, newindex);
    }
  }
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Work Experience.</h1>
      <p className="text-sm text-gray-500 text-center">
        Enter your Work experience here..
      </p>
      <div className="max-w-xl mx-auto">
        <Form {...form}>
          <form 
           onSubmit={(e) =>e.preventDefault() }
          className="flex flex-col gap-6 mt-6 ">
            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
              collisionDetection={closestCenter}
            >
              <SortableContext strategy={verticalListSortingStrategy} items={fields}>
                {fields.map((field, i) => (
                  <WorkExperienceItem
                    id={field.id}
                    key={field.id}
                    form={form}
                    index={i}
                    remove={remove}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <div className="mx-auto">
              <Button
                type="button"
                onClick={() =>
                  append({
                    company: "",
                    description: "",
                    endDate: "",
                    position: "",
                    startDate: "",
                  })
                }
              >
                Add Work Experience
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
interface workExperienceProps {
  form: UseFormReturn<workExperienceValues>;
  index: number;
  remove: (index: number) => void;
  id:string 
}
function WorkExperienceItem({ form, index, remove ,id}: workExperienceProps) {
  const {attributes,listeners,setNodeRef,transform,transition,isDragging}=useSortable({id})
 
  return (
    <div 
    ref={setNodeRef}
    style={{
      transform:CSS.Transform.toString(transform),
      transition
    }}
    className={cn ("border border-stone-500 bg-black p-4 rounded-xl",isDragging && "shadow-xl z-50 shadow-stone-500 cursor-grab relative")}>
      <div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">
            Work Experience {index + 1}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <GripHorizontal
                {...attributes}
                {...listeners}
                className="size-5 cursor-pointer text-gray-400 hover:text-gray-50" />
              </TooltipTrigger>

              <TooltipContent>
                <p>Drag & Drop</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <FormField
            control={form.control}
            name={`workExperiences.${index}.company`}
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="group-focus-within:text-blue-300">
                  Company Name :
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoFocus
                    {...field}
                    placeholder="Enter your company name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={`workExperiences.${index}.position`}
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="group-focus-within:text-blue-300">
                  {" "}
                  Job Title :
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Enter your job position"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <div className="grid grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name={`workExperiences.${index}.startDate`}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                    Start Date :
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value?.slice(0, 10)}
                     
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={`workExperiences.${index}.endDate`}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                    End Date :
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value?.slice(0, 10)}
                     
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Remain blank if you are still working currently.
                  </FormDescription>
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormField
            control={form.control}
            name={`workExperiences.${index}.description`}
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="group-focus-within:text-blue-300">
                  Job Description :
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter your job description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div className="flex justify-end">
            <DialogBox remove={remove} index={index} />
          </div>
        </div>
      </div>
    </div>
  );
}
