"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { formatMoney, formatMoneyCompact } from "@/lib/money";
import type { MonthlyPoint } from "@/lib/mock";
import type { CurrencyCode } from "@/lib/types";

const chartConfig = {
  income: { label: "Entradas", color: "var(--color-chart-2)" },
  expense: { label: "Saídas", color: "var(--color-chart-3)" },
} satisfies ChartConfig;

export function CashflowChart({
  data,
  currency,
}: {
  data: MonthlyPoint[];
  currency: CurrencyCode;
}) {
  const rows = data.map((point) => ({
    month: new Intl.DateTimeFormat("pt-PT", { month: "short" }).format(
      new Date(point.month),
    ),
    income: point.income / 100,
    expense: point.expense / 100,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-64 w-full min-w-0">
      <AreaChart data={rows} margin={{ left: 4, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-income)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-expense)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--color-expense)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          className="text-xs"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={64}
          tickFormatter={(value: number) =>
            formatMoneyCompact(value * 100, currency)
          }
          className="text-xs"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex w-full items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    {chartConfig[name as keyof typeof chartConfig]?.label}
                  </span>
                  <span className="tabular font-medium">
                    {formatMoney(Number(value) * 100, currency, {
                      hideDecimals: true,
                    })}
                  </span>
                </div>
              )}
            />
          }
        />
        <Area
          dataKey="income"
          type="monotone"
          stroke="var(--color-income)"
          strokeWidth={2}
          fill="url(#fillIncome)"
        />
        <Area
          dataKey="expense"
          type="monotone"
          stroke="var(--color-expense)"
          strokeWidth={2}
          fill="url(#fillExpense)"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
