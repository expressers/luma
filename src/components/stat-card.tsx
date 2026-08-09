import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  change,
  tone = "neutral",
  /** Quando true, uma variação positiva é boa (rendimentos); false inverte (despesas). */
  positiveIsGood = true,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  change?: number;
  tone?: "neutral" | "positive" | "negative";
  positiveIsGood?: boolean;
}) {
  const isUp = (change ?? 0) >= 0;
  const isGood = isUp === positiveIsGood;
  const TrendIcon = isUp ? TrendingUpIcon : TrendingDownIcon;

  return (
    <Card className="gap-0 py-5">
      <CardContent className="space-y-3 px-5">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm font-medium">
            {label}
          </span>
          <Icon className="text-muted-foreground size-4" />
        </div>

        <p
          className={cn(
            "tabular font-heading text-2xl font-semibold tracking-tight",
            tone === "positive" && "text-success",
            tone === "negative" && "text-destructive",
          )}
        >
          {value}
        </p>

        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          {change !== undefined ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 font-medium",
                isGood ? "text-success" : "text-destructive",
              )}
            >
              <TrendIcon className="size-3.5" />
              {new Intl.NumberFormat("pt-PT", {
                style: "percent",
                maximumFractionDigits: 1,
              }).format(Math.abs(change))}
            </span>
          ) : null}
          {hint ? <span className="truncate">{hint}</span> : null}
        </div>
      </CardContent>
    </Card>
  );
}
