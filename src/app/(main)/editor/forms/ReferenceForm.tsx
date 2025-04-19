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
import DialogBox from "../Dialog/Dialog";
import { referenceValues, referenceSchema } from "@/lib/validation";
export default function ReferenceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<referenceValues>({
    defaultValues: {
      references: resumeData?.references ?? [],
    },
    resolver: zodResolver(referenceSchema),
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
            references:
              values.references?.filter((exp) => exp !== undefined) || [],
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
    control: form.control,
    name: "references",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === over.id);
      const newIndex = fields.findIndex((field) => field.id === active.id);

      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  };
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Reference.</h1>
      <p className="text-sm text-gray-500 text-center">
        .Add your References here.
      </p>
      <div className="max-w-xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-6 mt-6 "
          >
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
                  <ReferenceItem
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
                    emailAddress: "",
                    location: "",
                    organizationName: "",
                    personName: "",
                    phoneNo: "",
                  })
                }
              >
                Add Reference
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
const ReferenceItem = ({
  id,
  form,
  index,
  remove,
}: {
  id: string;
  form: UseFormReturn<referenceValues>;
  index: number;
  remove: (index: number) => void;
}) => {
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
          <span className="text-xl font-semibold">Reference {index + 1}</span>
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
            name={`references.${index}.personName`}
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="group-focus-within:text-blue-300">
                  Individual's Name :
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoFocus
                    {...field}
                    placeholder="Enter name of the individual"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={`references.${index}.organizationName`}
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="group-focus-within:text-blue-300">
                  {" "}
                  Organization Name :
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Enter organization name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={`references.${index}.location`}
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="group-focus-within:text-blue-300">
                  Organization Location :
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter location of orgaination"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div className="grid grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name={`references.${index}.emailAddress`}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                    Email Address:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={`references.${index}.phoneNo`}
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="group-focus-within:text-blue-300">
                    Phone Number:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="flex justify-end">
            <DialogBox remove={remove} index={index} />
          </div>
        </div>
      </div>
    </div>
  );
};
