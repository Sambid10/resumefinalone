import { EditorFormProps } from "@/lib/types";
import { educationSchema, educationValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import React from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { useRef } from "react";
import { GripHorizontal } from "lucide-react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DialogBox from "../Dialog/Dialog";
export default function EducationForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<educationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData?.educations ?? [],
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
            educations:
              values.educations?.filter((data) => data !== undefined) || [],
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

  const { append, fields, remove, move } = useFieldArray({
    name: "educations",
    control: form.control,
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
      const oldindex = fields.findIndex((field) => field.id === over.id);
      const newindex = fields.findIndex((field) => field.id === active.id);
      move(oldindex, newindex);
      return arrayMove(fields, oldindex, newindex);
    }
  }

  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Education.</h1>
      <p className="text-sm text-gray-500 text-center">
        Enter your education here..
      </p>
      <div className="max-w-xl mx-auto">
        <Form {...form}>
          <form 
          onSubmit={(e)=>e.preventDefault()}
          className="flex flex-col gap-6 mt-6 ">
            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
              collisionDetection={closestCenter}
            >
              <SortableContext
                strategy={verticalListSortingStrategy}
                items={fields}
              >
                {fields.map((field, i) => (
                  <EducationItem
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
                    degreeName: "",
                    endDate: "",
                    gpa: "",
                    institutionName: "",
                    startDate: "",
                    universityName: "",
                  })
                }
              >
                Add Education
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

interface EducationProps {
  id: string;
  form: UseFormReturn<educationValues>;
  remove: (index: number) => void;
  index: number;
}
function EducationItem({ form, index, remove, id }: EducationProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  return (
    <div
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      ref={setNodeRef}
      className={cn(
        "border border-stone-500 bg-black p-4 rounded-xl",
        isDragging && "shadow-xl z-50 shadow-stone-500 cursor-grab relative"
      )}
    >
      <div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">Education {index + 1}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <GripHorizontal
                  {...attributes}
                  {...listeners}
                  className="size-5 cursor-pointer text-gray-400 hover:text-gray-50"
                />
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
            name={`educations.${index}.universityName`}
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="group-focus-within:text-blue-300">
                  University Name :
                </FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    type="text"
                    {...field}
                    placeholder="Enter your university name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={`educations.${index}.institutionName`}
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="group-focus-within:text-blue-300">
                  {" "}
                  Institution Name :
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Enter your institution name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={`educations.${index}.degreeName`}
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="group-focus-within:text-blue-300">
                  Degree Name :
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Enter your degree name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div className="grid grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name={`educations.${index}.startDate`}
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
              name={`educations.${index}.endDate`}
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
                    Remain blank if you are still in university/college.
                  </FormDescription>
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormField
            control={form.control}
            name={`educations.${index}.gpa`}
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="group-focus-within:text-blue-300">
                  GPA :
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your GPA" />
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
