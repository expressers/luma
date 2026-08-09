import { EyeOffIcon, PlusIcon } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { TransactionsTable } from "@/components/transactions-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getHiddenCount, getTransactions } from "@/lib/mock";

export const metadata = { title: "Transações" };

export default function TransactionsPage() {
  const transactions = getTransactions();
  const hidden = getHiddenCount();

  return (
    <>
      <PageHeader
        title="Transações"
        description="Entradas, saídas e transferências entre as contas deste espaço."
        actions={
          <Button>
            <PlusIcon />
            Nova transação
          </Button>
        }
      />

      {hidden > 0 ? (
        <Alert>
          <EyeOffIcon />
          <AlertTitle>Há movimentos que não te são mostrados</AlertTitle>
          <AlertDescription>
            {hidden} movimentos deste espaço estão marcados como privados por
            outros membros. Nem o owner do espaço lhes acede.
          </AlertDescription>
        </Alert>
      ) : null}

      <TransactionsTable transactions={transactions} />
    </>
  );
}
