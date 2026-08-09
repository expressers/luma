import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  PiggyBankIcon,
  PlusIcon,
  WalletIcon,
} from "lucide-react";

import { CashflowChart } from "@/components/cashflow-chart";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { TransactionRow } from "@/components/transaction-row";
import { VisibilityBadge } from "@/components/visibility-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ACTIVE_SPACE,
  CURRENT_USER,
  getAccounts,
  getCategoryBreakdown,
  getDashboardSummary,
  getDebtSummary,
  getGoals,
  getMonthlySeries,
  getTransactions,
} from "@/lib/mock";
import { formatDate, formatMoney, formatPercent } from "@/lib/money";

export const metadata = { title: "Dashboard" };

function change(current: number, previous: number): number | undefined {
  if (previous === 0) return undefined;
  return (current - previous) / previous;
}

export default function DashboardPage() {
  const summary = getDashboardSummary();
  const series = getMonthlySeries();
  const breakdown = getCategoryBreakdown();
  const accounts = getAccounts();
  const recent = getTransactions({ limit: 6 });
  const goals = getGoals().filter((goal) => goal.status !== "ACHIEVED");
  const debts = getDebtSummary();
  const currency = summary.currency;

  return (
    <>
      <PageHeader
        title={`Olá, ${CURRENT_USER.name.split(" ")[0]}`}
        description={`Vista geral de ${ACTIVE_SPACE.name} em agosto de 2026.`}
        actions={
          <Button>
            <PlusIcon />
            Nova transação
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Saldo total"
          value={formatMoney(summary.totalBalance, currency, {
            hideDecimals: true,
          })}
          hint={`${accounts.length} contas visíveis`}
          icon={WalletIcon}
        />
        <StatCard
          label="Entradas (30 dias)"
          value={formatMoney(summary.income, currency, { hideDecimals: true })}
          change={change(summary.income, summary.previousIncome)}
          hint="face aos 30 dias anteriores"
          icon={ArrowDownLeftIcon}
          tone="positive"
        />
        <StatCard
          label="Saídas (30 dias)"
          value={formatMoney(summary.expense, currency, { hideDecimals: true })}
          change={change(summary.expense, summary.previousExpense)}
          positiveIsGood={false}
          hint="face aos 30 dias anteriores"
          icon={ArrowUpRightIcon}
        />
        <StatCard
          label="Taxa de poupança"
          value={formatPercent(summary.savingsRate)}
          hint="do que entrou nos últimos 30 dias"
          icon={PiggyBankIcon}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="min-w-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>Entradas e saídas</CardTitle>
            <CardDescription>
              Seis meses completos, até julho de 2026
            </CardDescription>
          </CardHeader>
          <CardContent className="min-w-0">
            <CashflowChart data={series} currency={currency} />
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Onde foi o dinheiro</CardTitle>
            <CardDescription>
              Despesas dos últimos 30 dias por categoria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {breakdown.slice(0, 6).map((item) => (
              <div key={item.categoryId} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="truncate">{item.name}</span>
                  <span className="tabular text-muted-foreground shrink-0 text-xs">
                    {formatMoney(item.total, currency, { hideDecimals: true })}
                  </span>
                </div>
                <Progress value={item.share * 100} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="min-w-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>Objetivos</CardTitle>
            <CardDescription>
              Progresso da poupança com destino definido
            </CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/app/goals">
                  Ver todos
                  <ArrowRightIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.slice(0, 4).map((goal) => (
              <div key={goal.id} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="truncate">{goal.name}</span>
                  <span className="tabular text-muted-foreground shrink-0 text-xs">
                    {formatMoney(goal.saved, currency, { hideDecimals: true })}{" "}
                    de{" "}
                    {formatMoney(goal.targetAmount, currency, {
                      hideDecimals: true,
                    })}
                  </span>
                </div>
                <Progress value={goal.progress * 100} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Dívidas</CardTitle>
            <CardAction>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/app/debts">
                  Gerir
                  <ArrowRightIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-xs">Em dívida</p>
              <p className="tabular font-heading text-2xl font-semibold tracking-tight">
                {formatMoney(debts.totalPayable, currency, {
                  hideDecimals: true,
                })}
              </p>
            </div>
            <Separator />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Prestações por mês</dt>
                <dd className="tabular font-medium">
                  {formatMoney(debts.monthlyInstalments, currency, {
                    hideDecimals: true,
                  })}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Próximo vencimento</dt>
                <dd className="font-medium">
                  {debts.next?.nextDueAt
                    ? formatDate(debts.next.nextDueAt)
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">A receber</dt>
                <dd className="tabular text-success font-medium">
                  {formatMoney(debts.totalReceivable, currency, {
                    hideDecimals: true,
                  })}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="min-w-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>Movimentos recentes</CardTitle>
            <CardDescription>
              Só vês o que te pertence ou foi partilhado contigo.
            </CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/app/transactions">
                  Ver todos
                  <ArrowRightIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="px-3">
            <div className="divide-border/60 divide-y">
              {recent.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Contas</CardTitle>
            <CardAction>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/app/accounts">
                  Gerir
                  <ArrowRightIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-1">
            {accounts.slice(0, 5).map((account, index) => (
              <div key={account.id}>
                {index > 0 ? <Separator className="my-1" /> : null}
                <Link
                  href={`/app/accounts/${account.id}`}
                  className="hover:bg-muted/40 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {account.name}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {account.institution ?? "Sem instituição"}
                    </p>
                  </div>
                  <VisibilityBadge
                    visibility={account.visibility}
                    showLabel={false}
                  />
                  <span className="tabular shrink-0 text-sm font-medium">
                    {formatMoney(account.currentBalance, account.currencyCode, {
                      hideDecimals: true,
                    })}
                  </span>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
