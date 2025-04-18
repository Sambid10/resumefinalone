import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { workExperienceSchema, workExperienceValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { EditorFormProps } from "@/lib/types";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
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
import { projectValues, projectSchema } from "@/lib/validation";
import DialogBox from "../Dialog/Dialog";
import { Textarea } from "@/components/ui/textarea";
export default function ProjectForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<projectValues>({
    defaultValues: {
      projects: resumeData?.projects ?? [],
    },
    resolver: zodResolver(projectSchema),
  });

  const { append, fields, remove, replace, move } = useFieldArray({
    control: form.control,
    name: "projects",
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
            projects: values.projects?.filter((pro) => pro !== undefined) || [],
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.id === over.id);
      const newIndex = fields.findIndex((field) => field.id === active.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  };
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Projects.</h1>
      <p className="text-sm text-gray-500 text-center">
        Enter your project's information here..
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
              <SortableContext
                strategy={verticalListSortingStrategy}
                items={fields}
              >
                {fields.map((field, i) => (
                  <ProjectItem
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
                    endDate: "",
                    projectDescription: "",
                    projectName: "",
                    startDate: "",
                    projectSubDescription:""
                  })
                }
              >
                Add new Project
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
interface ProjectItemProps {
  id: string;
  form: UseFormReturn<projectValues>;
  index: number;
  remove: (id: number) => void;
}
function ProjectItem({ form, id, index, remove }: ProjectItemProps) {
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
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "border border-stone-500 bg-black p-4 rounded-xl",
        isDragging && "shadow-xl z-50 shadow-stone-500 cursor-grab relative"
      )}
    >
      <div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">Project {index + 1}</span>
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
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <FormField
          control={form.control}
          name={`projects.${index}.projectName`}
          render={({ field }) => (
            <FormItem className="group">
              <FormLabel className="group-focus-within:text-blue-300">
                Project Name :
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoFocus
                  {...field}
                  placeholder="Enter your project name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name={`projects.${index}.projectSubDescription`}
          render={({ field }) => (
            <FormItem className="group">
              <FormLabel className="group-focus-within:text-blue-300">
                {" "}
                Project SubDescription :
              </FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter your short project description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name={`projects.${index}.projectDescription`}
          render={({ field }) => (
            <FormItem className="group">
              <FormLabel className="group-focus-within:text-blue-300">
                {" "}
                Project Description :
              </FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter your project description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <div className="grid grid-cols-2 gap-4 items-start">
          <FormField
            control={form.control}
            name={`projects.${index}.startDate`}
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
            name={`projects.${index}.endDate`}
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

        <div className="flex justify-end">
          <DialogBox remove={remove} index={index} />
        </div>
      </div>
    </div>
  );
}
