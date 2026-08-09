import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowDownLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  PencilIcon,
} from "lucide-react";

import { PageHeader } from "@/components/page-header";
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
import {
  getAccount,
  getTransactions,
  memberById,
  openingBalance,
} from "@/lib/mock";
import { formatMoney } from "@/lib/money";

const STATEMENT_LIMIT = 15;

export async function generateMetadata({
  params,
}: PageProps<"/app/accounts/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: getAccount(id)?.name ?? "Conta" };
}

export default async function AccountDetailPage({
  params,
}: PageProps<"/app/accounts/[id]">) {
  const { id } = await params;
  const account = getAccount(id);
  if (!account) notFound();

  const transactions = getTransactions({ accountId: id });
  const owner = memberById(account.ownerId);

  const inflow = transactions
    .filter((t) => t.type === "INCOME" || t.counterAccountId === id)
    .reduce((sum, t) => sum + t.amount, 0);
  const outflow = transactions
    .filter((t) => t.accountId === id && t.type !== "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <PageHeader
        title={account.name}
        description={`${account.institution ?? "Sem instituição"} · ${account.currencyCode}`}
        actions={
          <Button variant="outline">
            <PencilIcon />
            Editar
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="min-w-0">
          <CardHeader>
            <CardDescription>Saldo atual</CardDescription>
            <CardTitle className="tabular font-heading text-3xl">
              {formatMoney(account.currentBalance, account.currencyCode)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Visibilidade</span>
              <VisibilityBadge visibility={account.visibility} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Responsável</span>
              <span className="truncate font-medium">{owner?.name}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Saldo de abertura</span>
              <span className="tabular font-medium">
                {formatMoney(openingBalance(id), account.currencyCode, {
                  hideDecimals: true,
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <ArrowDownLeftIcon className="text-success size-4" />
              Entradas registadas
            </CardDescription>
            <CardTitle className="tabular text-success font-heading text-2xl">
              {formatMoney(inflow, account.currencyCode, {
                hideDecimals: true,
              })}
            </CardTitle>
            <CardDescription>
              Desde o início do histórico desta conta
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <ArrowUpRightIcon className="size-4" />
              Saídas registadas
            </CardDescription>
            <CardTitle className="tabular font-heading text-2xl">
              {formatMoney(outflow, account.currencyCode, {
                hideDecimals: true,
              })}
            </CardTitle>
            <CardDescription>
              {transactions.length} movimentos no total
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Extrato</CardTitle>
          <CardDescription>
            Os movimentos mais recentes que tens autorização para ver.
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
            {transactions.slice(0, STATEMENT_LIMIT).map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
