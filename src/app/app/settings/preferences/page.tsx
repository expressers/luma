import { ThemePreference } from "@/components/theme-preference";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export const metadata = { title: "Preferências" };

export default function PreferencesSettingsPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>
            O tema aplica-se a este dispositivo e segue o sistema por omissão.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThemePreference />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moeda e formato</CardTitle>
          <CardDescription>
            A moeda do espaço é usada para totais e relatórios.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="currency">Moeda principal</Label>
            <Select defaultValue="AOA">
              <SelectTrigger id="currency" className="w-full">
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
          <div className="space-y-2">
            <Label htmlFor="language">Idioma</Label>
            <Select defaultValue="pt">
              <SelectTrigger id="language" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>
            Escolhe o que queres receber por e-mail.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              title: "Resumo semanal",
              body: "Um resumo das entradas e saídas todas as segundas-feiras.",
              on: true,
            },
            {
              title: "Alertas de gastos",
              body: "Quando uma categoria ultrapassa a média habitual.",
              on: true,
            },
            {
              title: "Convites e alterações de acesso",
              body: "Sempre que alguém partilha ou revoga um recurso contigo.",
              on: true,
            },
          ].map((item, index) => (
            <div key={item.title}>
              {index > 0 ? <Separator className="mb-4" /> : null}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">{item.body}</p>
                </div>
                <Switch defaultChecked={item.on} aria-label={item.title} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
