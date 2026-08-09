import Link from "next/link";

import { PasswordField } from "@/components/password-field";
import {
  AuthDivider,
  SocialAuthButtons,
} from "@/components/social-auth-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = { title: "Criar conta" };

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Cria a tua conta
        </h1>
        <p className="text-muted-foreground text-sm">
          Começa com o teu espaço pessoal. Convidas quem quiseres depois.
        </p>
      </div>

      <SocialAuthButtons />
      <AuthDivider label="ou regista-te com e-mail" />

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Tchiinhemba Kiala"
            required
          />
        </div>

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

        <PasswordField />

        <div className="flex items-start gap-2">
          <Checkbox id="terms" className="mt-0.5" />
          <Label
            htmlFor="terms"
            className="text-muted-foreground text-xs leading-relaxed font-normal"
          >
            Aceito os Termos de Serviço e a Política de Privacidade do Luma.
          </Label>
        </div>

        <Button asChild className="w-full">
          <Link href="/onboarding">Criar conta</Link>
        </Button>
      </form>

      <p className="text-muted-foreground text-center text-sm">
        Já tens conta?{" "}
        <Link
          href="/auth/login"
          className="text-foreground font-medium underline-offset-4 hover:underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
