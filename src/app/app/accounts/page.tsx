import Link from "next/link";
import {
  BanknoteIcon,
  BuildingIcon,
  ChevronRightIcon,
  PiggyBankIcon,
  PlusIcon,
  SmartphoneIcon,
  UsersIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { VisibilityBadge } from "@/components/visibility-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAccounts } from "@/lib/mock";
import { formatMoney } from "@/lib/money";
import type { FinancialAccountType } from "@/lib/types";

export const metadata = { title: "Contas" };

const TYPE_META: Record<
  FinancialAccountType,
  { label: string; icon: LucideIcon }
> = {
  BANK: { label: "Banco", icon: BuildingIcon },
  JOINT: { label: "Conjunta", icon: UsersIcon },
  SAVINGS: { label: "Poupança", icon: PiggyBankIcon },
  CASH: { label: "Dinheiro", icon: BanknoteIcon },
  DIGITAL_WALLET: { label: "Carteira digital", icon: SmartphoneIcon },
};

export default function AccountsPage() {
  const accounts = getAccounts();

  return (
    <>
      <PageHeader
        title="Contas"
        description="Bancos, poupanças, dinheiro e carteiras digitais deste espaço."
        actions={
          <Button>
            <PlusIcon />
            Nova conta
          </Button>
        }
      />

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="bank">Bancos</TabsTrigger>
          <TabsTrigger value="savings">Poupanças</TabsTrigger>
          <TabsTrigger value="cash">Dinheiro</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account) => {
          const meta = TYPE_META[account.type];
          return (
            <Card
              key={account.id}
              className="hover:border-primary/40 group gap-0 py-0 transition-colors"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-xl">
                      <meta.icon className="size-4.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{account.name}</p>
                      <p className="text-muted-foreground truncate text-xs">
                        {account.institution ?? meta.label}
                      </p>
                    </div>
                  </div>
                  <VisibilityBadge
                    visibility={account.visibility}
                    showLabel={false}
                  />
                </div>

                <p className="tabular font-heading mt-5 text-2xl font-semibold tracking-tight">
                  {formatMoney(account.currentBalance, account.currencyCode)}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {meta.label} · {account.currencyCode}
                </p>

                <Separator className="my-4" />

                <Link
                  href={`/app/accounts/${account.id}`}
                  className="text-muted-foreground group-hover:text-foreground flex items-center justify-between text-sm transition-colors"
                >
                  Ver movimentos
                  <ChevronRightIcon className="size-4" />
                </Link>
              </CardContent>
            </Card>
          );
        })}

        <button
          type="button"
          className="border-border text-muted-foreground hover:border-primary/50 hover:text-foreground flex min-h-52 flex-col items-center justify-center gap-2 rounded-xl border border-dashed transition-colors"
        >
          <PlusIcon className="size-5" />
          <span className="text-sm font-medium">Adicionar conta</span>
          <span className="text-xs">Banco, poupança, dinheiro ou carteira</span>
        </button>
      </div>
    </>
  );
}
