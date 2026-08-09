"use client";

import { BellIcon, MailIcon, ShieldAlertIcon, TrendingUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const NOTIFICATIONS = [
  {
    id: "n1",
    icon: MailIcon,
    title: "Convite por aceitar",
    body: "O Paulo Chinhemba ainda não aceitou o convite para a Família Chinhemba.",
    when: "há 5 dias",
    unread: true,
  },
  {
    id: "n2",
    icon: TrendingUpIcon,
    title: "Gastos acima do habitual",
    body: "Alimentação está 18% acima da média dos últimos três meses.",
    when: "há 2 dias",
    unread: true,
  },
  {
    id: "n3",
    icon: ShieldAlertIcon,
    title: "Nova sessão iniciada",
    body: "Sessão iniciada em Chrome · Luanda, Angola.",
    when: "há 1 semana",
    unread: false,
  },
];

export function NotificationsMenu() {
  const unread = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Notificações${unread ? `, ${unread} por ler` : ""}`}
          className="relative"
        >
          <BellIcon />
          {unread > 0 ? (
            <span className="bg-primary ring-background absolute top-1.5 right-1.5 size-2 rounded-full ring-2" />
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-84 p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-medium">Notificações</span>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
            Marcar todas como lidas
          </Button>
        </div>
        <Separator />
        <ScrollArea className="max-h-80">
          <ul className="divide-border divide-y">
            {NOTIFICATIONS.map((item) => (
              <li
                key={item.id}
                className="hover:bg-muted/50 flex gap-3 px-4 py-3 transition-colors"
              >
                <div className="bg-muted text-muted-foreground mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full">
                  <item.icon className="size-4" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    {item.title}
                    {item.unread ? (
                      <span className="bg-primary size-1.5 shrink-0 rounded-full" />
                    ) : null}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {item.body}
                  </p>
                  <p className="text-muted-foreground/70 text-xs">{item.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
