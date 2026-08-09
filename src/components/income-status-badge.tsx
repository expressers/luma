import {
  ArchiveIcon,
  CheckIcon,
  ClockIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { IncomeStatus } from "@/lib/types";

const CONFIG = {
  RECEIVED: {
    label: "Recebido",
    icon: CheckIcon,
    className: "bg-success/12 text-success dark:bg-success/18",
  },
  PENDING: {
    label: "A aguardar",
    icon: ClockIcon,
    className: "bg-muted text-muted-foreground",
  },
  LATE: {
    label: "Em atraso",
    icon: TriangleAlertIcon,
    className: "bg-destructive/12 text-destructive dark:bg-destructive/20",
  },
  INACTIVE: {
    label: "Inativa",
    icon: ArchiveIcon,
    className: "bg-muted text-muted-foreground/70",
  },
} as const;

export function IncomeStatusBadge({
  status,
  className,
}: {
  status: IncomeStatus;
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
