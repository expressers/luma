import {
  ClockIcon,
  CrownIcon,
  MailPlusIcon,
  MoreHorizontalIcon,
  ShieldIcon,
  SproutIcon,
  UserRoundIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ACTIVE_SPACE, MEMBERS } from "@/lib/mock";
import { formatDate } from "@/lib/money";
import type { MemberRole } from "@/lib/types";

export const metadata = { title: "Membros" };

const ROLE_META: Record<
  MemberRole,
  { label: string; icon: LucideIcon; description: string }
> = {
  owner: {
    label: "Owner",
    icon: CrownIcon,
    description: "Controla o espaço e pode transferir a propriedade.",
  },
  admin: {
    label: "Admin",
    icon: ShieldIcon,
    description: "Gere membros e recursos partilhados.",
  },
  member: {
    label: "Membro",
    icon: UserRoundIcon,
    description: "Cria e gere os próprios recursos.",
  },
  child: {
    label: "Criança",
    icon: SproutIcon,
    description: "Acesso limitado. Não vê rendimentos nem dívidas.",
  },
};

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function MembersPage() {
  const active = MEMBERS.filter((m) => m.status === "ACTIVE");
  const invited = MEMBERS.filter((m) => m.status === "INVITED");

  return (
    <>
      <PageHeader
        title="Membros"
        description={`Quem tem acesso a ${ACTIVE_SPACE.name} e com que papel.`}
        actions={
          <Button>
            <MailPlusIcon />
            Convidar membro
          </Button>
        }
      />

      <Card className="gap-0 py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Membro</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead className="hidden md:table-cell">Desde</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {active.map((member) => {
                const role = ROLE_META[member.role];
                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="text-xs">
                            {initials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{member.name}</p>
                          <p className="text-muted-foreground truncate text-xs">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <role.icon />
                        {role.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell">
                      {formatDate(member.joinedAt, "long")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Opções de ${member.name}`}
                      >
                        <MoreHorizontalIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}

              {invited.map((member) => (
                <TableRow key={member.id} className="text-muted-foreground">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="border-border border border-dashed bg-transparent text-xs">
                          {initials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{member.name}</p>
                        <p className="truncate text-xs">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="gap-1">
                      <ClockIcon />
                      Convite pendente
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    Enviado {formatDate(member.joinedAt, "long")}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Reenviar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>O que cada papel pode fazer</CardTitle>
          <CardDescription>
            Estar no mesmo espaço não expõe automaticamente os recursos de
            ninguém. Cada recurso tem a sua própria visibilidade.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {Object.entries(ROLE_META).map(([key, role]) => (
            <div key={key} className="flex gap-3">
              <span className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
                <role.icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium">{role.label}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
