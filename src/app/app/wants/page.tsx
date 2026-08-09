import {
  ArrowRightIcon,
  CheckIcon,
  HourglassIcon,
  PlusIcon,
  SparklesIcon,
  WalletIcon,
} from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { VisibilityBadge } from "@/components/visibility-badge";
import {
  WantPriorityBadge,
  wantStatusLabel,
} from "@/components/want-priority-badge";
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
import { getWantSummary, getWants, memberById } from "@/lib/mock";
import { formatMoney } from "@/lib/money";
import type { WantView } from "@/lib/mock";

export const metadata = { title: "Desejos" };

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function affordHint(want: WantView): string {
  if (want.monthsToAfford === undefined) {
    return "sem folga mensal para o financiar";
  }
  const months = Math.ceil(want.monthsToAfford);
  return months <= 1
    ? "cabe na folga de um mês"
    : `${months} meses de folga mensal`;
}

function WantCard({ want }: { want: WantView }) {
  const owner = memberById(want.ownerId);

  return (
    <Card className="min-w-0 gap-3">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate">{want.name}</CardTitle>
            {want.note ? (
              <CardDescription className="line-clamp-2">
                {want.note}
              </CardDescription>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <VisibilityBadge visibility={want.visibility} showLabel={false} />
            <WantPriorityBadge priority={want.priority} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="tabular font-heading text-xl font-semibold tracking-tight">
            {formatMoney(want.estimatedCost, want.currencyCode, {
              hideDecimals: true,
            })}
          </p>
          <p className="text-muted-foreground text-xs">{affordHint(want)}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarFallback className="text-[10px]">
                {initials(owner?.name ?? "?")}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground text-xs">
              {owner?.name.split(" ")[0]}
            </span>
          </div>
          <Button variant="outline" size="sm">
            Converter em objetivo
            <ArrowRightIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function WantsPage() {
  const wants = getWants();
  const summary = getWantSummary();
  const currency = summary.currency;

  const open = wants.filter((want) => want.status === "IDEA");
  const resolved = wants.filter((want) => want.status !== "IDEA");

  return (
    <>
      <PageHeader
        title="Desejos"
        description="O que a família gostava de ter, antes de virar compromisso."
        actions={
          <Button>
            <PlusIcon />
            Novo desejo
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Lista de desejos"
          value={formatMoney(summary.openTotal, currency, {
            hideDecimals: true,
          })}
          hint={`${summary.openCount} desejos em aberto`}
          icon={SparklesIcon}
        />
        <StatCard
          label="Prioridade alta"
          value={formatMoney(summary.highPriorityTotal, currency, {
            hideDecimals: true,
          })}
          hint="o que a família quer mesmo"
          icon={CheckIcon}
        />
        <StatCard
          label="Folga mensal"
          value={formatMoney(summary.monthlySurplus, currency, {
            hideDecimals: true,
          })}
          hint="entradas menos saídas nos últimos 30 dias"
          icon={WalletIcon}
          tone={summary.monthlySurplus > 0 ? "positive" : "negative"}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {open.map((want) => (
          <WantCard key={want.id} want={want} />
        ))}
      </div>

      {resolved.length > 0 ? (
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Já decididos</CardTitle>
            <CardDescription>
              Desejos comprados, descartados ou promovidos a objetivo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {resolved.map((want) => (
              <div
                key={want.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2"
              >
                <HourglassIcon className="text-muted-foreground/60 size-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{want.name}</p>
                  <p className="text-muted-foreground truncate text-xs">
                    {formatMoney(want.estimatedCost, want.currencyCode, {
                      hideDecimals: true,
                    })}
                    {want.goalName ? " · a poupança já está em curso" : ""}
                  </p>
                </div>
                <Badge variant="outline">{wantStatusLabel(want.status)}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
