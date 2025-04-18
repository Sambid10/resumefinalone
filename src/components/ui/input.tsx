import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground  outline-none focus:border-blue-400 placeholder:text-muted-foreground selection:bg-blue-400 selection:text-black dark:bg-input/30  flex h-10 w-full min-w-0 rounded-xl border border-stone-400 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow]  file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
