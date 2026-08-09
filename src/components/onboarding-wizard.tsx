"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BanknoteIcon,
  BuildingIcon,
  CheckIcon,
  PiggyBankIcon,
  SmartphoneIcon,
  UserRoundIcon,
  UsersRoundIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { LumaWordmark } from "@/components/luma-mark";
import { ThemeToggleInline } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Perfil", description: "Quem és e em que moeda pensas" },
  { title: "Espaço", description: "Sozinho ou em conjunto" },
  { title: "Primeira conta", description: "Por onde entra e sai o dinheiro" },
];

const SPACE_OPTIONS: {
  value: string;
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    value: "personal",
    title: "Só para mim",
    body: "Um espaço pessoal e privado. Podes criar um espaço partilhado mais tarde.",
    icon: UserRoundIcon,
  },
  {
    value: "family",
    title: "Com a minha família",
    body: "Cria um espaço de família e convida quem quiseres. Cada um mantém a sua privacidade.",
    icon: UsersRoundIcon,
  },
];

const ACCOUNT_TYPES: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "BANK", label: "Banco", icon: BuildingIcon },
  { value: "SAVINGS", label: "Poupança", icon: PiggyBankIcon },
  { value: "CASH", label: "Dinheiro", icon: BanknoteIcon },
  { value: "DIGITAL_WALLET", label: "Carteira digital", icon: SmartphoneIcon },
];

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [spaceChoice, setSpaceChoice] = useState("family");
  const [accountType, setAccountType] = useState("BANK");

  const isLast = step === STEPS.length - 1;

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between p-6">
        <LumaWordmark />
        <div className="flex items-center gap-2">
          <ThemeToggleInline />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/app">Saltar</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-8 p-6">
        <ol className="flex items-center gap-2">
          {STEPS.map((item, index) => (
            <li key={item.title} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  index < step && "bg-primary text-primary-foreground",
                  index === step &&
                    "bg-primary text-primary-foreground ring-primary/25 ring-4",
                  index > step && "bg-muted text-muted-foreground",
                )}
              >
                {index < step ? <CheckIcon className="size-3.5" /> : index + 1}
              </span>
              {index < STEPS.length - 1 ? (
                <span
                  className={cn(
                    "h-0.5 flex-1 rounded-full",
                    index < step ? "bg-primary" : "bg-muted",
                  )}
                />
              ) : null}
            </li>
          ))}
        </ol>

        <div className="space-y-2">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Passo {step + 1} de {STEPS.length}
          </p>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {STEPS[step].title}
          </h1>
          <p className="text-muted-foreground text-sm">
            {STEPS[step].description}
          </p>
        </div>

        {step === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="ob-name">Como te chamas?</Label>
              <Input id="ob-name" placeholder="Tchiinhemba Kiala" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ob-country">País</Label>
              <Select defaultValue="AO">
                <SelectTrigger id="ob-country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AO">Angola</SelectItem>
                  <SelectItem value="PT">Portugal</SelectItem>
                  <SelectItem value="BR">Brasil</SelectItem>
                  <SelectItem value="MZ">Moçambique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ob-currency">Moeda principal</Label>
              <Select defaultValue="AOA">
                <SelectTrigger id="ob-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AOA">Kwanza (AOA)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  <SelectItem value="USD">Dólar (USD)</SelectItem>
                  <SelectItem value="BRL">Real (BRL)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div
            role="radiogroup"
            aria-label="Tipo de espaço inicial"
            className="space-y-3"
          >
            {SPACE_OPTIONS.map((option) => {
              const selected = spaceChoice === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSpaceChoice(option.value)}
                  className={cn(
                    "flex w-full gap-3 rounded-xl border p-4 text-left transition-colors",
                    selected
                      ? "border-primary ring-primary/20 ring-2"
                      : "hover:border-primary/40",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg",
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <option.icon className="size-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium">{option.title}</span>
                    <span className="text-muted-foreground block text-sm leading-relaxed">
                      {option.body}
                    </span>
                  </span>
                </button>
              );
            })}

            {spaceChoice === "family" ? (
              <div className="space-y-2 pt-1">
                <Label htmlFor="ob-space">Nome do espaço</Label>
                <Input id="ob-space" placeholder="Família Chinhemba" />
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <div
              role="radiogroup"
              aria-label="Tipo de conta"
              className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {ACCOUNT_TYPES.map((type) => {
                const selected = accountType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setAccountType(type.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-colors",
                      selected
                        ? "border-primary ring-primary/20 ring-2"
                        : "text-muted-foreground hover:border-primary/40",
                    )}
                  >
                    <type.icon className="size-4.5" />
                    {type.label}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ob-account">Nome da conta</Label>
                <Input id="ob-account" placeholder="Conta à Ordem" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ob-institution">Instituição</Label>
                <Input id="ob-institution" placeholder="Banco BAI" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="ob-balance">Saldo atual</Label>
                <Input
                  id="ob-balance"
                  inputMode="decimal"
                  placeholder="0,00"
                  className="tabular"
                />
                <p className="text-muted-foreground text-xs">
                  Podes ajustar mais tarde. Este valor passa a ser o saldo de
                  abertura da conta.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-2 pt-2">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeftIcon />
            Anterior
          </Button>

          {isLast ? (
            <Button asChild>
              <Link href="/app">
                Concluir
                <CheckIcon />
              </Link>
            </Button>
          ) : (
            <Button onClick={() => setStep((s) => s + 1)}>
              Continuar
              <ArrowRightIcon />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
