import {
  CheckCheckIcon,
  MailIcon,
  ShieldAlertIcon,
  TrendingUpIcon,
  UserPlusIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "Notificações" };

interface Notification {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  when: string;
  unread: boolean;
  tone: "info" | "warning" | "security";
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    icon: MailIcon,
    title: "Convite por aceitar",
    body: "O Paulo Chinhemba ainda não aceitou o convite para a Família Chinhemba. O convite expira em 48 horas.",
    when: "há 5 dias",
    unread: true,
    tone: "info",
  },
  {
    id: "n2",
    icon: TrendingUpIcon,
    title: "Gastos acima do habitual",
    body: "Alimentação está 18% acima da média dos últimos três meses.",
    when: "há 2 dias",
    unread: true,
    tone: "warning",
  },
  {
    id: "n3",
    icon: UserPlusIcon,
    title: "Novo membro no espaço",
    body: "A Aida Chinhemba entrou na Família Chinhemba com o papel de Criança.",
    when: "há 3 semanas",
    unread: false,
    tone: "info",
  },
  {
    id: "n4",
    icon: ShieldAlertIcon,
    title: "Nova sessão iniciada",
    body: "Sessão iniciada em Chrome · Luanda, Angola. Se não foste tu, muda a palavra-passe.",
    when: "há 1 semana",
    unread: false,
    tone: "security",
  },
];

const TONE_CLASS: Record<Notification["tone"], string> = {
  info: "bg-shared/10 text-shared",
  warning: "bg-warning/12 text-warning",
  security: "bg-destructive/10 text-destructive",
};

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        title="Notificações"
        description="Convites, alertas financeiros e eventos de segurança."
        actions={
          <Button variant="outline">
            <CheckCheckIcon />
            Marcar todas como lidas
          </Button>
        }
      />

      <div className="space-y-3">
        {NOTIFICATIONS.map((item) => (
          <Card key={item.id} className="gap-0 py-0">
            <CardContent className="flex gap-4 p-4">
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full ${TONE_CLASS[item.tone]}`}
              >
                <item.icon className="size-4.5" />
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{item.title}</p>
                  {item.unread ? (
                    <Badge variant="secondary" className="text-[10px]">
                      Nova
                    </Badge>
                  ) : null}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.body}
                </p>
                <p className="text-muted-foreground/70 text-xs">{item.when}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
