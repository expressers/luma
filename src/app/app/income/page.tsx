import {
  CalendarClockIcon,
  PlusIcon,
  TrendingUpIcon,
  TriangleAlertIcon,
  WalletIcon,
} from "lucide-react";

import { IncomeStatusBadge } from "@/components/income-status-badge";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { TransactionRow } from "@/components/transaction-row";
import { VisibilityBadge } from "@/components/visibility-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import {
  accountById,
  frequencyLabel,
  getIncomeSources,
  getIncomeSummary,
  getIncomeTransactions,
  memberById,
  monthlyEquivalent,
} from "@/lib/mock";
import { formatDate, formatMoney } from "@/lib/money";

export const metadata = { title: "Rendimentos" };

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function IncomePage() {
  const sources = getIncomeSources();
  const summary = getIncomeSummary();
  const recent = getIncomeTransactions({ limit: 6 });
  const currency = summary.currency;

  const active = sources.filter((source) => source.active);
  const inactive = sources.filter((source) => !source.active);
  const late = sources.filter((source) => source.status === "LATE");

  return (
    <>
      <PageHeader
        title="Rendimentos"
        description="De onde vem o dinheiro, com que frequência e quanto se espera."
        actions={
          <Button>
            <PlusIcon />
            Nova fonte
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Esperado por mês"
          value={formatMoney(summary.expectedMonthly, currency, {
            hideDecimals: true,
          })}
          hint={`${active.length} fontes ativas, normalizadas ao mês`}
          icon={TrendingUpIcon}
        />
        <StatCard
          label="Recebido (30 dias)"
          value={formatMoney(summary.receivedWindow, currency, {
            hideDecimals: true,
          })}
          hint="entradas efetivamente registadas"
          icon={WalletIcon}
          tone="positive"
        />
        <StatCard
          label="Próxima entrada"
          value={
            summary.next?.nextExpectedAt
              ? formatDate(summary.next.nextExpectedAt, "long")
              : "Sem previsão"
          }
          hint={
            summary.next
              ? `${summary.next.name} · ${formatMoney(
                  summary.next.expectedAmount,
                  summary.next.currencyCode,
                  { hideDecimals: true },
                )}`
              : "Adiciona uma fonte recorrente"
          }
          icon={CalendarClockIcon}
        />
      </div>

      {late.length > 0 ? (
        <Alert>
          <TriangleAlertIcon />
          <AlertTitle>
            {late.length === 1
              ? "Uma fonte está em atraso"
              : `${late.length} fontes estão em atraso`}
          </AlertTitle>
          <AlertDescription>
            {late.map((source) => source.name).join(", ")} — o valor esperado
            ainda não deu entrada na conta.
          </AlertDescription>
        </Alert>
      ) : null}

      <Card className="min-w-0 gap-0 py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Fonte</TableHead>
                <TableHead className="hidden md:table-cell">
                  Frequência
                </TableHead>
                <TableHead className="hidden lg:table-cell">Conta</TableHead>
                <TableHead className="hidden xl:table-cell">Membro</TableHead>
                <TableHead className="hidden sm:table-cell">Estado</TableHead>
                <TableHead className="text-right">Valor esperado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {active.map((source) => {
                const owner = memberById(source.ownerId);
                const monthly = monthlyEquivalent(source);

                const cadence =
                  source.frequency === "MONTHLY"
                    ? "por mês"
                    : source.frequency === "ONE_OFF"
                      ? "valor único"
                      : `${formatMoney(monthly, currency, { hideDecimals: true })}/mês`;

                return (
                  <TableRow key={source.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-medium">{source.name}</p>
                          <p className="text-muted-foreground truncate text-xs">
                            {source.payer}
                          </p>
                        </div>
                        <VisibilityBadge
                          visibility={source.visibility}
                          showLabel={false}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">
                        {frequencyLabel(source.frequency)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden lg:table-cell">
                      {accountById(source.accountId)?.name}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className="text-[10px]">
                            {initials(owner?.name ?? "?")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground text-sm">
                          {owner?.name.split(" ")[0]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="space-y-1">
                        <IncomeStatusBadge status={source.status} />
                        {source.nextExpectedAt ? (
                          <p className="text-muted-foreground text-xs">
                            Próxima: {formatDate(source.nextExpectedAt)}
                          </p>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className="tabular font-medium whitespace-nowrap">
                        {formatMoney(source.expectedAmount, source.currencyCode)}
                      </p>
                      <p className="text-muted-foreground text-xs whitespace-nowrap">
                        {source.variable ? "estimativa · " : ""}
                        {cadence}
                      </p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {inactive.length > 0 ? (
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Fontes inativas</CardTitle>
            <CardDescription>
              Já não geram entradas, mas ficam no histórico para os relatórios
              continuarem a bater certo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {inactive.map((source) => (
              <div
                key={source.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground truncate text-sm font-medium">
                    {source.name}
                  </p>
                  <p className="text-muted-foreground/70 truncate text-xs">
                    {source.payer} ·{" "}
                    {source.lastReceivedAt
                      ? `último recebimento em ${formatDate(source.lastReceivedAt, "long")}`
                      : "sem recebimentos registados"}
                  </p>
                </div>
                <IncomeStatusBadge status={source.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Últimas entradas</CardTitle>
          <CardDescription>
            O que realmente deu entrada nas contas, por oposição ao que estava
            previsto.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3">
          <div className="divide-border/60 divide-y">
            {recent.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
