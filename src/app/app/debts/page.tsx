import {
  BanknoteIcon,
  CalendarClockIcon,
  HandCoinsIcon,
  PlusIcon,
  ReceiptIcon,
  TrendingDownIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { DebtStatusBadge } from "@/components/debt-status-badge";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { VisibilityBadge } from "@/components/visibility-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  accountById,
  debtKindLabel,
  getDebtSummary,
  getDebts,
} from "@/lib/mock";
import { formatDate, formatMoney, formatPercent } from "@/lib/money";
import type { DebtView } from "@/lib/mock";

export const metadata = { title: "Dívidas" };

function rate(interestBps: number): string {
  return `${(interestBps / 100).toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`;
}

function DebtCard({ debt }: { debt: DebtView }) {
  const account = debt.accountId ? accountById(debt.accountId) : undefined;
  const settled = debt.status === "SETTLED";
  const incoming = debt.direction === "RECEIVABLE";

  return (
    <Card className="min-w-0 gap-4">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate">{debt.name}</CardTitle>
            <CardDescription className="truncate">
              {debt.counterparty}
            </CardDescription>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <VisibilityBadge visibility={debt.visibility} showLabel={false} />
            <DebtStatusBadge status={debt.status} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-muted-foreground text-xs">
              {settled
                ? "Liquidada"
                : debt.direction === "PAYABLE"
                  ? "Em dívida"
                  : "Por receber"}
            </p>
            <p className="tabular font-heading text-2xl font-semibold tracking-tight">
              {formatMoney(debt.outstanding, debt.currencyCode, {
                hideDecimals: true,
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-xs">de</p>
            <p className="tabular text-muted-foreground text-sm">
              {formatMoney(debt.principal, debt.currencyCode, {
                hideDecimals: true,
              })}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Progress value={debt.progress * 100} className="h-2" />
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>
              {formatPercent(debt.progress)}{" "}
              {incoming ? "recebido" : "amortizado"}
            </span>
            <span>
              {debt.paymentsMade}{" "}
              {incoming ? "parcelas recebidas" : "prestações pagas"}
            </span>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <dt className="text-muted-foreground text-xs">
              {incoming ? "Parcela" : "Prestação"}
            </dt>
            <dd className="tabular font-medium">
              {formatMoney(debt.instalment, debt.currencyCode, {
                hideDecimals: true,
              })}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">Taxa anual</dt>
            <dd className="tabular font-medium">
              {debt.interestBps === 0 ? "Sem juro" : rate(debt.interestBps)}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">
              {settled ? "Liquidada em" : "Próximo vencimento"}
            </dt>
            <dd className="font-medium">
              {settled
                ? debt.settledAt
                  ? formatDate(debt.settledAt, "long")
                  : "—"
                : debt.nextDueAt
                  ? formatDate(debt.nextDueAt, "long")
                  : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">
              {incoming ? "Juro recebido" : "Juro já pago"}
            </dt>
            <dd className="tabular font-medium">
              {formatMoney(debt.paidInterest, debt.currencyCode, {
                hideDecimals: true,
              })}
            </dd>
          </div>
        </dl>

        <div className="flex items-center gap-2 text-xs">
          <Badge variant="outline">{debtKindLabel(debt.kind)}</Badge>
          {account ? (
            <span className="text-muted-foreground truncate">
              debitada de {account.name}
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DebtsPage() {
  const debts = getDebts();
  const summary = getDebtSummary();
  const currency = summary.currency;

  const payable = debts.filter(
    (d) => d.direction === "PAYABLE" && d.status !== "SETTLED",
  );
  const receivable = debts.filter(
    (d) => d.direction === "RECEIVABLE" && d.status !== "SETTLED",
  );
  const settled = debts.filter((d) => d.status === "SETTLED");
  const late = debts.filter((d) => d.status === "LATE");

  return (
    <>
      <PageHeader
        title="Dívidas"
        description="Quanto falta pagar, a que ritmo e quanto custa o crédito."
        actions={
          <Button>
            <PlusIcon />
            Nova dívida
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total em dívida"
          value={formatMoney(summary.totalPayable, currency, {
            hideDecimals: true,
          })}
          hint={`${payable.length} créditos em curso`}
          icon={BanknoteIcon}
          tone="negative"
        />
        <StatCard
          label="Prestações por mês"
          value={formatMoney(summary.monthlyInstalments, currency, {
            hideDecimals: true,
          })}
          hint="compromisso mensal fixo"
          icon={ReceiptIcon}
        />
        <StatCard
          label="Juro já pago"
          value={formatMoney(summary.interestPaid, currency, {
            hideDecimals: true,
          })}
          hint="custo acumulado do crédito"
          icon={TrendingDownIcon}
        />
        <StatCard
          label="Próximo vencimento"
          value={
            summary.next?.nextDueAt
              ? formatDate(summary.next.nextDueAt, "long")
              : "Nada agendado"
          }
          hint={
            summary.next
              ? `${summary.next.name} · ${formatMoney(
                  summary.next.instalment,
                  summary.next.currencyCode,
                  { hideDecimals: true },
                )}`
              : "sem prestações em curso"
          }
          icon={CalendarClockIcon}
        />
      </div>

      {late.length > 0 ? (
        <Alert>
          <TriangleAlertIcon />
          <AlertTitle>
            {late.length === 1
              ? "Uma prestação está em atraso"
              : `${late.length} prestações estão em atraso`}
          </AlertTitle>
          <AlertDescription>
            {late.map((debt) => debt.name).join(", ")} — o vencimento já passou
            e o pagamento ainda não foi registado.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {payable.map((debt) => (
          <DebtCard key={debt.id} debt={debt} />
        ))}
      </div>

      {receivable.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <HandCoinsIcon className="text-muted-foreground size-4" />
            <h2 className="font-heading text-sm font-semibold">
              A receber ·{" "}
              <span className="tabular text-success">
                {formatMoney(summary.totalReceivable, currency, {
                  hideDecimals: true,
                })}
              </span>
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {receivable.map((debt) => (
              <DebtCard key={debt.id} debt={debt} />
            ))}
          </div>
        </section>
      ) : null}

      {settled.length > 0 ? (
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Já liquidadas</CardTitle>
            <CardDescription>
              Ficam no histórico porque o juro pago continua a contar para os
              relatórios.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {settled.map((debt) => (
              <div
                key={debt.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{debt.name}</p>
                  <p className="text-muted-foreground truncate text-xs">
                    {[
                      debt.counterparty,
                      `${formatMoney(debt.principal, debt.currencyCode, {
                        hideDecimals: true,
                      })} em ${debt.paymentsMade} prestações`,
                      debt.settledAt
                        ? `liquidada a ${formatDate(debt.settledAt, "long")}`
                        : undefined,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <DebtStatusBadge status={debt.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
