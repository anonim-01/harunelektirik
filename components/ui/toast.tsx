"use client"

import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { cn } from "@/lib/utils"

/* -----------------------------------------------------------------------------
   PROVIDERS (required named exports)
 ----------------------------------------------------------------------------- */
export const ToastProvider = ToastPrimitive.Provider
export const ToastViewport = ToastPrimitive.Viewport

/* -----------------------------------------------------------------------------
   BASIC TOAST COMPONENTS
 ----------------------------------------------------------------------------- */
const rootBase =
  "group pointer-events-auto flex w-full max-w-sm items-center gap-4 rounded-md border border-border bg-background p-4 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full"

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => <ToastPrimitive.Root ref={ref} className={cn(rootBase, className)} {...props} />)
Toast.displayName = ToastPrimitive.Root.displayName

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={cn("text-sm opacity-80", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/60 transition-colors hover:text-foreground",
      className,
    )}
    {...props}
  >
    ×
  </ToastPrimitive.Close>
))
ToastClose.displayName = ToastPrimitive.Close.displayName
