import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = { title: "Recuperar palavra-passe" };

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Recuperar acesso
        </h1>
        <p className="text-muted-foreground text-sm">
          Escreve o teu e-mail e enviamos-te um link para definires uma nova
          palavra-passe.
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="tu@exemplo.ao"
            required
          />
        </div>
        <Button className="w-full">Enviar link de recuperação</Button>
      </form>

      <Button variant="ghost" asChild className="w-full">
        <Link href="/auth/login">
          <ArrowLeftIcon />
          Voltar ao início de sessão
        </Link>
      </Button>
    </div>
  );
}
