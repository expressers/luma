import { cn } from "@/lib/utils";

export function LumaMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-4.5">
        <path
          d="M20.4 14.2A8.6 8.6 0 0 1 9.8 3.6a9 9 0 1 0 10.6 10.6Z"
          fill="currentColor"
        />
        <circle cx="17.4" cy="5.6" r="2.1" fill="currentColor" opacity="0.65" />
      </svg>
    </span>
  );
}

export function LumaWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LumaMark />
      <span className="font-heading text-lg font-semibold tracking-tight">
        Luma
      </span>
    </span>
  );
}
