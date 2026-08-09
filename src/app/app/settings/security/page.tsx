import { LaptopIcon, SmartphoneIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export const metadata = { title: "Segurança" };

const SESSIONS = [
  {
    id: "s1",
    icon: LaptopIcon,
    device: "MacBook Pro · Chrome",
    location: "Luanda, Angola",
    when: "Sessão atual",
    current: true,
  },
  {
    id: "s2",
    icon: SmartphoneIcon,
    device: "iPhone 15 · Safari",
    location: "Luanda, Angola",
    when: "há 2 dias",
    current: false,
  },
];

export default function SecuritySettingsPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Palavra-passe</CardTitle>
          <CardDescription>
            Usa pelo menos 12 caracteres, com letras, números e símbolos.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:max-w-md">
          <div className="space-y-2">
            <Label htmlFor="current">Palavra-passe atual</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">Nova palavra-passe</Label>
            <Input id="new" type="password" />
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t">
          <Button>Atualizar palavra-passe</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autenticação em dois passos</CardTitle>
          <CardDescription>
            Uma segunda camada de proteção para a tua vida financeira.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Aplicação autenticadora</p>
              <p className="text-muted-foreground text-xs">
                Google Authenticator, 1Password ou equivalente.
              </p>
            </div>
            <Switch aria-label="Ativar autenticação em dois passos" />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Alertas de novo dispositivo</p>
              <p className="text-muted-foreground text-xs">
                Recebe um e-mail sempre que houver uma sessão nova.
              </p>
            </div>
            <Switch defaultChecked aria-label="Alertas de novo dispositivo" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessões ativas</CardTitle>
          <CardDescription>
            Termina qualquer sessão que não reconheças.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {SESSIONS.map((session, index) => (
            <div key={session.id}>
              {index > 0 ? <Separator className="my-1" /> : null}
              <div className="flex items-center gap-3 py-2">
                <span className="bg-muted text-muted-foreground flex size-9 items-center justify-center rounded-lg">
                  <session.icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {session.device}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {session.location} · {session.when}
                  </p>
                </div>
                {session.current ? (
                  <Badge variant="secondary">Atual</Badge>
                ) : (
                  <Button variant="ghost" size="sm">
                    Terminar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
