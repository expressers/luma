import { UploadIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENT_USER } from "@/lib/mock";

export const metadata = { title: "Perfil" };

export default function ProfileSettingsPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Dados pessoais</CardTitle>
          <CardDescription>
            Como apareces para os outros membros dos teus espaços.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg font-medium">
                {CURRENT_USER.initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <Button variant="outline" size="sm">
                <UploadIcon />
                Carregar fotografia
              </Button>
              <p className="text-muted-foreground text-xs">
                JPG ou PNG, até 2 MB.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" defaultValue={CURRENT_USER.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" defaultValue={CURRENT_USER.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Select defaultValue="AO">
                <SelectTrigger id="country">
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
              <Label htmlFor="timezone">Fuso horário</Label>
              <Select defaultValue="Africa/Luanda">
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Africa/Luanda">
                    Africa/Luanda (WAT)
                  </SelectItem>
                  <SelectItem value="Europe/Lisbon">Europe/Lisbon</SelectItem>
                  <SelectItem value="America/Sao_Paulo">
                    America/Sao_Paulo
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2 border-t">
          <Button variant="ghost">Cancelar</Button>
          <Button>Guardar alterações</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exportar ou eliminar</CardTitle>
          <CardDescription>
            Os teus dados são teus. Podes levá-los ou apagá-los a qualquer
            momento.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline">Exportar todos os dados</Button>
          <Button variant="ghost" className="text-destructive">
            Eliminar conta
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
