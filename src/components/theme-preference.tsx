"use client";

import { useTheme } from "next-themes";
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const OPTIONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "light", label: "Claro", icon: SunIcon },
  { value: "dark", label: "Escuro", icon: MoonIcon },
  { value: "system", label: "Sistema", icon: MonitorIcon },
];

export function ThemePreference() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Tema"
      className="grid gap-3 sm:grid-cols-3"
    >
      {OPTIONS.map((option) => {
        const selected = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setTheme(option.value)}
            className={cn(
              "group relative flex flex-col gap-3 rounded-xl border p-3 text-left transition-colors",
              selected
                ? "border-primary ring-primary/20 ring-2"
                : "hover:border-primary/40",
            )}
          >
            <div
              className={cn(
                "flex h-20 flex-col justify-between rounded-lg border p-2",
                option.value === "dark"
                  ? "border-slate-700 bg-slate-900"
                  : option.value === "light"
                    ? "border-slate-200 bg-slate-50"
                    : "border-border bg-linear-to-br from-slate-50 to-slate-900",
              )}
            >
              <div className="flex gap-1">
                <span className="bg-primary size-2 rounded-full" />
                <span className="h-2 w-8 rounded-full bg-current opacity-20" />
              </div>
              <div className="space-y-1">
                <span className="block h-2 w-full rounded-full bg-current opacity-15" />
                <span className="block h-2 w-2/3 rounded-full bg-current opacity-15" />
              </div>
            </div>

            <span className="flex items-center gap-2 text-sm font-medium">
              <option.icon className="size-4" />
              {option.label}
              {selected ? (
                <CheckIcon className="text-primary ml-auto size-4" />
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
