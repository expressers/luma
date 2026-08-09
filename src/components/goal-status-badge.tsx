import {
  CircleCheckIcon,
  CircleDotIcon,
  CircleXIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { GoalStatus } from "@/lib/types";

const CONFIG = {
  ACHIEVED: {
    label: "Alcançado",
    icon: CircleCheckIcon,
    className: "bg-success/12 text-success dark:bg-success/18",
  },
  ON_TRACK: {
    label: "No caminho",
    icon: CircleDotIcon,
    className: "bg-primary/10 text-primary dark:bg-primary/20",
  },
  AT_RISK: {
    label: "Em risco",
    icon: TriangleAlertIcon,
    className: "bg-warning/14 text-warning dark:bg-warning/20",
  },
  OVERDUE: {
    label: "Prazo esgotado",
    icon: CircleXIcon,
    className: "bg-destructive/12 text-destructive dark:bg-destructive/20",
  },
} as const;

export function GoalStatusBadge({
  status,
  className,
}: {
  status: GoalStatus;
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
