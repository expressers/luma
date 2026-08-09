import { CheckIcon, ClockIcon, TriangleAlertIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DebtStatus } from "@/lib/types";

const CONFIG = {
  ON_TRACK: {
    label: "Em dia",
    icon: ClockIcon,
    className: "bg-muted text-muted-foreground",
  },
  LATE: {
    label: "Em atraso",
    icon: TriangleAlertIcon,
    className: "bg-destructive/12 text-destructive dark:bg-destructive/20",
  },
  SETTLED: {
    label: "Liquidada",
    icon: CheckIcon,
    className: "bg-success/12 text-success dark:bg-success/18",
  },
} as const;

export function DebtStatusBadge({
  status,
  className,
}: {
  status: DebtStatus;
  className?: string;
}) {
  const { label, icon: Icon, className: tone } = CONFIG[status];

  return (
    <Badge variant="secondary" className={cn(tone, "gap-1", className)}>
      <Icon aria-hidden />
      {label}
    </Badge>
  );
}
