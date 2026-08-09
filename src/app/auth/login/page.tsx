import Link from "next/link";

import {
  AuthDivider,
  SocialAuthButtons,
} from "@/components/social-auth-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Bem-vindo de volta
        </h1>
        <p className="text-muted-foreground text-sm">
          Entra na tua conta para continuares.
        </p>
      </div>

      <SocialAuthButtons />
      <AuthDivider />

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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Palavra-passe</Label>
            <Link
              href="/auth/forgot-password"
              className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
            >
              Esqueceste-te?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" defaultChecked />
          <Label htmlFor="remember" className="text-muted-foreground font-normal">
            Manter sessão iniciada
          </Label>
        </div>

        <Button asChild className="w-full">
          <Link href="/app">Entrar</Link>
        </Button>
      </form>

      <p className="text-muted-foreground text-center text-sm">
        Ainda não tens conta?{" "}
        <Link
          href="/auth/register"
          className="text-foreground font-medium underline-offset-4 hover:underline"
        >
          Criar conta
        </Link>
      </p>
    </div>
  );
}
