import Link from "next/link";
import { LockIcon, UsersRoundIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "Aceitar convite" };

export default function AcceptInvitePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Foste convidado
        </h1>
        <p className="text-muted-foreground text-sm">
          A Marta Chinhemba convidou-te para um espaço partilhado.
        </p>
      </div>

      <Card className="gap-0 py-0">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-primary-foreground flex size-11 items-center justify-center rounded-xl">
              <UsersRoundIcon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-medium">Família Chinhemba</p>
              <p className="text-muted-foreground text-xs">
                Espaço de família · 4 membros · Kwanza (AOA)
              </p>
            </div>
          </div>

          <div className="flex -space-x-2">
            {["MC", "NC", "AC", "TK"].map((initials) => (
              <Avatar key={initials} className="ring-background size-8 ring-2">
                <AvatarFallback className="text-[10px]">
                  {initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>

          <div className="bg-muted/60 text-muted-foreground flex gap-2 rounded-lg p-3 text-xs leading-relaxed">
            <LockIcon className="mt-0.5 size-3.5 shrink-0" />
            <p>
              Entrar neste espaço não expõe as tuas finanças. Continuas a
              decidir, recurso a recurso, o que fica visível.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Button asChild className="w-full">
          <Link href="/app">Aceitar convite</Link>
        </Button>
        <Button variant="ghost" className="w-full">
          Recusar
        </Button>
      </div>
    </div>
  );
}
