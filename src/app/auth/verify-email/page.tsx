import Link from "next/link";
import { MailCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata = { title: "Confirma o teu e-mail" };

export default function VerifyEmailPage() {
  return (
    <div className="space-y-6 text-center">
      <div className="bg-primary/10 text-primary mx-auto flex size-14 items-center justify-center rounded-2xl">
        <MailCheckIcon className="size-6" />
      </div>

      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Confirma o teu e-mail
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Enviámos um link de confirmação para{" "}
          <span className="text-foreground font-medium">tu@exemplo.ao</span>.
          Abre-o para ativares a conta.
        </p>
      </div>

      <div className="space-y-2">
        <Button variant="outline" className="w-full">
          Reenviar e-mail
        </Button>
        <Button variant="ghost" asChild className="w-full">
          <Link href="/auth/login">Usar outro e-mail</Link>
        </Button>
      </div>

      <p className="text-muted-foreground text-xs">
        Não recebeste nada? Verifica a pasta de spam antes de reenviar.
      </p>
    </div>
  );
}
