"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const RULES = [
  { label: "12 caracteres", test: (v: string) => v.length >= 12 },
  { label: "uma maiúscula", test: (v: string) => /[A-Z]/.test(v) },
  { label: "um número", test: (v: string) => /\d/.test(v) },
  { label: "um símbolo", test: (v: string) => /[^\w\s]/.test(v) },
];

const LEVELS = [
  { label: "Muito fraca", className: "bg-destructive" },
  { label: "Fraca", className: "bg-destructive" },
  { label: "Razoável", className: "bg-warning" },
  { label: "Boa", className: "bg-warning" },
  { label: "Forte", className: "bg-success" },
];

export function PasswordField() {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const passed = RULES.filter((rule) => rule.test(value)).length;
  const level = LEVELS[passed];

  return (
    <div className="space-y-2">
      <Label htmlFor="password">Palavra-passe</Label>
      <div className="relative">
        <Input
          id="password"
          type={visible ? "text" : "password"}
          autoComplete="new-password"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="pr-10"
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={visible ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-1 size-7 -translate-y-1/2"
        >
          {visible ? (
            <EyeOffIcon className="size-4" />
          ) : (
            <EyeIcon className="size-4" />
          )}
        </Button>
      </div>

      <div className="flex gap-1" aria-hidden>
        {RULES.map((rule, index) => (
          <span
            key={rule.label}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              index < passed ? level.className : "bg-muted",
            )}
          />
        ))}
      </div>

      <p className="text-muted-foreground text-xs">
        {value.length === 0 ? (
          <>Precisa de {RULES.map((r) => r.label).join(", ")}.</>
        ) : (
          <>
            <span className="text-foreground font-medium">{level.label}</span>
            {passed < RULES.length
              ? ` — falta ${RULES.filter((r) => !r.test(value))
                  .map((r) => r.label)
                  .join(", ")}.`
              : " — pronta a usar."}
          </>
        )}
      </p>
    </div>
  );
}
