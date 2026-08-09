import { CategoryIcon } from "@/components/category-icon";
import { VisibilityBadge } from "@/components/visibility-badge";
import { accountById, categoryById, memberById } from "@/lib/mock";
import { formatDate, formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

export function signedAmount(transaction: Transaction): string {
  const { type, amount, currencyCode } = transaction;
  const formatted = formatMoney(amount, currencyCode);
  if (type === "INCOME") return `+ ${formatted}`;
  if (type === "EXPENSE") return `− ${formatted}`;
  return formatted;
}

export function amountToneClass(type: Transaction["type"]): string {
  if (type === "INCOME") return "text-success";
  if (type === "EXPENSE") return "text-foreground";
  return "text-muted-foreground";
}

export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const account = accountById(transaction.accountId);
  const category = categoryById(transaction.categoryId);
  const owner = memberById(transaction.ownerId);

  return (
    <div className="hover:bg-muted/40 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors">
      <CategoryIcon
        categoryId={transaction.categoryId}
        type={transaction.type}
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {transaction.description}
        </p>
        <p className="text-muted-foreground truncate text-xs">
          {[
            category?.name ?? "Transferência",
            account?.name,
            owner?.id === "u1" ? null : owner?.name.split(" ")[0],
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      <VisibilityBadge
        visibility={transaction.visibility}
        showLabel={false}
        className="hidden sm:inline-flex"
      />

      <div className="text-right">
        <p
          className={cn(
            "tabular text-sm font-medium",
            amountToneClass(transaction.type),
          )}
        >
          {signedAmount(transaction)}
        </p>
        <p className="text-muted-foreground text-xs">
          {formatDate(transaction.occurredAt)}
        </p>
      </div>
    </div>
  );
}
