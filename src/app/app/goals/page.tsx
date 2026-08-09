import {
  CarIcon,
  CircleDashedIcon,
  GiftIcon,
  GraduationCapIcon,
  HouseIcon,
  LaptopIcon,
  PiggyBankIcon,
  PlaneIcon,
  PlusIcon,
  ShieldCheckIcon,
  TargetIcon,
  TrendingUpIcon,
  TriangleAlertIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { GoalStatusBadge } from "@/components/goal-status-badge";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { VisibilityBadge } from "@/components/visibility-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getGoalSummary, getGoals, memberById } from "@/lib/mock";
import { formatDate, formatMoney, formatPercent } from "@/lib/money";
import type { GoalView } from "@/lib/mock";

export const metadata = { title: "Objetivos" };

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck: ShieldCheckIcon,
  House: HouseIcon,
  Plane: PlaneIcon,
  Car: CarIcon,
  GraduationCap: GraduationCapIcon,
  Laptop: LaptopIcon,
  Gift: GiftIcon,
};

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function deadlineHint(goal: GoalView): string {
  if (goal.status === "ACHIEVED") {
    return goal.lastContributionAt
      ? `concluído em ${formatDate(goal.lastContributionAt, "long")}`
      : "concluído";
  }
  if (!goal.deadline) return "sem prazo definido";
  if (goal.monthsLeft !== undefined && goal.monthsLeft < 1) {
    return `prazo em ${formatDate(goal.deadline, "long")}`;
  }
  return `${Math.round(goal.monthsLeft ?? 0)} meses até ${formatDate(goal.deadline, "long")}`;
}

function GoalCard({ goal }: { goal: GoalView }) {
  const Icon = ICONS[goal.icon] ?? CircleDashedIcon;
  const assignees = (goal.assigneeIds ?? [goal.ownerId])
    .map((id) => memberById(id))
    .filter((member) => member !== undefined);

  return (
    <Card className="min-w-0 gap-4">
      <CardHeader>
        <div className="flex items-start gap-3">
          <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full">
            <Icon className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate">{goal.name}</CardTitle>
            <CardDescription className="truncate">
              {goal.description ?? deadlineHint(goal)}
            </CardDescription>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <VisibilityBadge visibility={goal.visibility} showLabel={false} />
            <GoalStatusBadge status={goal.status} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <p className="tabular font-heading text-2xl font-semibold tracking-tight">
            {formatMoney(goal.saved, goal.currencyCode, { hideDecimals: true })}
          </p>
          <p className="tabular text-muted-foreground text-sm">
            de{" "}
            {formatMoney(goal.targetAmount, goal.currencyCode, {
              hideDecimals: true,
            })}
          </p>
        </div>

        <div className="space-y-1.5">
          <Progress value={goal.progress * 100} className="h-2" />
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>{formatPercent(goal.progress)}</span>
            <span>{deadlineHint(goal)}</span>
          </div>
        </div>

        {goal.status !== "ACHIEVED" ? (
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground text-xs">Ritmo atual</dt>
              <dd className="tabular font-medium">
                {formatMoney(goal.currentMonthly, goal.currencyCode, {
                  hideDecimals: true,
                })}
                <span className="text-muted-foreground font-normal">/mês</span>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs">
                Ritmo necessário
              </dt>
              <dd
                className={
                  goal.requiredMonthly > goal.currentMonthly
                    ? "tabular text-warning font-medium"
                    : "tabular font-medium"
                }
              >
                {goal.requiredMonthly > 0
                  ? formatMoney(goal.requiredMonthly, goal.currencyCode, {
                      hideDecimals: true,
                    })
                  : "—"}
                {goal.requiredMonthly > 0 ? (
                  <span className="text-muted-foreground font-normal">
                    /mês
                  </span>
                ) : null}
              </dd>
            </div>
          </dl>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <div className="flex -space-x-2">
            {assignees.map((member) => (
              <Avatar
                key={member.id}
                className="ring-background size-7 ring-2"
                title={member.name}
              >
                <AvatarFallback className="text-[10px]">
                  {initials(member.name)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <PlusIcon />
            Contribuir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function GoalsPage() {
  const goals = getGoals();
  const summary = getGoalSummary();
  const currency = summary.currency;

  const active = goals.filter((goal) => goal.status !== "ACHIEVED");
  const achieved = goals.filter((goal) => goal.status === "ACHIEVED");
  const atRisk = goals.filter(
    (goal) => goal.status === "AT_RISK" || goal.status === "OVERDUE",
  );

  return (
    <>
      <PageHeader
        title="Objetivos"
        description="Para onde está a ir a poupança e se o ritmo chega para o prazo."
        actions={
          <Button>
            <PlusIcon />
            Novo objetivo
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Poupado"
          value={formatMoney(summary.saved, currency, { hideDecimals: true })}
          hint={`de ${formatMoney(summary.target, currency, { hideDecimals: true })} em ${goals.length} objetivos`}
          icon={PiggyBankIcon}
          tone="positive"
        />
        <StatCard
          label="Progresso global"
          value={formatPercent(summary.progress)}
          hint="média ponderada pelos alvos"
          icon={TargetIcon}
        />
        <StatCard
          label="Esforço necessário"
          value={formatMoney(summary.requiredMonthly, currency, {
            hideDecimals: true,
          })}
          hint="por mês, para cumprir todos os prazos"
          icon={TrendingUpIcon}
        />
        <StatCard
          label="Alcançados"
          value={String(summary.achievedCount)}
          hint={
            summary.atRiskCount > 0
              ? `${summary.atRiskCount} em risco`
              : "nenhum objetivo em risco"
          }
          icon={ShieldCheckIcon}
        />
      </div>

      {atRisk.length > 0 ? (
        <Alert>
          <TriangleAlertIcon />
          <AlertTitle>
            {atRisk.length === 1
              ? "Um objetivo precisa de mais esforço"
              : `${atRisk.length} objetivos precisam de mais esforço`}
          </AlertTitle>
          <AlertDescription>
            {atRisk.map((goal) => goal.name).join(", ")} — ao ritmo atual, o
            prazo não é cumprido.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {active.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {achieved.length > 0 ? (
        <section className="space-y-4">
          <h2 className="font-heading text-sm font-semibold">Alcançados</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {achieved.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
