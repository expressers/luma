import Link from "next/link";
import {
  ArrowRightIcon,
  EyeOffIcon,
  LayersIcon,
  LockIcon,
  UsersRoundIcon,
  WalletIcon,
} from "lucide-react";

import { LumaWordmark } from "@/components/luma-mark";
import { ThemeToggleInline } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: LockIcon,
    title: "Privado por omissão",
    body: "Cada conta, movimento ou documento nasce privado. Nem o owner do espaço lhe acede sem que partilhes.",
  },
  {
    icon: UsersRoundIcon,
    title: "Espaços, não contas partilhadas",
    body: "Pessoal, família ou casa. Alternas entre eles com um clique e cada um tem os seus membros e papéis.",
  },
  {
    icon: WalletIcon,
    title: "Um livro-razão a sério",
    body: "Saldos que batem certo, transferências que não contam como despesa e conversão cambial congelada na data.",
  },
  {
    icon: EyeOffIcon,
    title: "Visibilidade recurso a recurso",
    body: "Privado, partilhado com o espaço, ou apenas com as pessoas que escolheres.",
  },
  {
    icon: LayersIcon,
    title: "Muito além de finanças",
    body: "Património, objetivos, documentos e compromissos no mesmo sítio, à medida que o Luma cresce.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between p-6">
        <LumaWordmark />
        <nav className="flex items-center gap-2">
          <ThemeToggleInline />
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Criar conta</Link>
          </Button>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6">
        <section className="flex flex-col items-center gap-6 py-20 text-center md:py-28">
          <Badge variant="secondary" className="h-6 gap-1.5">
            <LockIcon />
            Partilhar não é perder privacidade
          </Badge>

          <h1 className="font-heading max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Organiza a tua vida, sozinho ou em conjunto.
          </h1>

          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed text-pretty">
            O Luma reúne contas, movimentos, património e documentos da tua
            família num único sítio — sem expor o que é teu.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/register">
                Começar agora
                <ArrowRightIcon />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/app">Ver demonstração</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="gap-0 py-0">
              <CardContent className="space-y-3 p-6">
                <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                  <feature.icon className="size-4.5" />
                </span>
                <h2 className="font-medium">{feature.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <footer className="border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col gap-2 p-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>Luma — o sistema operativo da tua vida.</p>
          <p className="text-xs">
            Protótipo visual. Dados de demonstração, sem ligação a base de
            dados.
          </p>
        </div>
      </footer>
    </div>
  );
}
