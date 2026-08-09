import Link from "next/link";
import { LockIcon, SparklesIcon, UsersRoundIcon } from "lucide-react";

import { LumaWordmark } from "@/components/luma-mark";
import { ThemeToggleInline } from "@/components/theme-toggle";

const PILLARS = [
  {
    icon: LockIcon,
    title: "Privado por omissão",
    body: "Cada recurso nasce privado. Partilhas só o que decides partilhar.",
  },
  {
    icon: UsersRoundIcon,
    title: "Feito para famílias",
    body: "Vários espaços, vários papéis, uma só conta.",
  },
  {
    icon: SparklesIcon,
    title: "Clareza, não planilhas",
    body: "Saldos, categorias e tendências sem trabalho manual.",
  },
];

export default function AuthLayout({ children }: LayoutProps<"/auth">) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-6 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Link href="/">
            <LumaWordmark />
          </Link>
          <ThemeToggleInline />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>

        <p className="text-muted-foreground text-center text-xs">
          Ao continuares aceitas os{" "}
          <Link href="/terms" className="hover:text-foreground underline">
            Termos
          </Link>{" "}
          e a{" "}
          <Link href="/privacy" className="hover:text-foreground underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>

      <div className="bg-muted/40 relative hidden border-l lg:flex lg:flex-col lg:justify-center lg:p-12">
        <div
          aria-hidden
          className="from-primary/10 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent to-transparent"
        />
        <div className="relative max-w-md space-y-10">
          <div className="space-y-3">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance">
              Organiza a tua vida, sozinho ou em conjunto.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              O Luma reúne contas, movimentos, património e documentos num só
              sítio — sem que partilhar signifique abdicar da tua privacidade.
            </p>
          </div>

          <ul className="space-y-5">
            {PILLARS.map((pillar) => (
              <li key={pillar.title} className="flex gap-3">
                <span className="bg-background text-primary flex size-9 shrink-0 items-center justify-center rounded-lg border">
                  <pillar.icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">{pillar.title}</p>
                  <p className="text-muted-foreground text-sm">{pillar.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
