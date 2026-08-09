import { TriangleAlertIcon } from "lucide-react";

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
import { ACTIVE_SPACE } from "@/lib/mock";

export const metadata = { title: "Espaço" };

export default function SpaceSettingsPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Este espaço</CardTitle>
          <CardDescription>
            Nome, tipo e moeda de {ACTIVE_SPACE.name}.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="space-name">Nome do espaço</Label>
            <Input id="space-name" defaultValue={ACTIVE_SPACE.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="space-type">Tipo</Label>
            <Select defaultValue={ACTIVE_SPACE.type}>
              <SelectTrigger id="space-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PERSONAL">Pessoal</SelectItem>
                <SelectItem value="FAMILY">Família</SelectItem>
                <SelectItem value="HOUSEHOLD">Casa</SelectItem>
                <SelectItem value="BUSINESS">Negócio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="space-currency">Moeda do espaço</Label>
            <Select defaultValue={ACTIVE_SPACE.currencyCode}>
              <SelectTrigger id="space-currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AOA">Kwanza angolano (AOA)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                <SelectItem value="USD">Dólar americano (USD)</SelectItem>
                <SelectItem value="BRL">Real brasileiro (BRL)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2 border-t">
          <Button variant="ghost">Cancelar</Button>
          <Button>Guardar alterações</Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <TriangleAlertIcon className="size-4" />
            Zona de risco
          </CardTitle>
          <CardDescription>
            Eliminar o espaço remove todas as contas, transações e acessos dos
            membros. Há um período de graça de 30 dias antes da remoção
            definitiva.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline">Transferir propriedade</Button>
          <Button variant="outline" className="text-destructive">
            Eliminar espaço
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
