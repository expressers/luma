import { ChevronDownIcon, ChevronUpIcon, MinusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { WantPriority, WantStatus } from "@/lib/types";

const PRIORITY = {
  HIGH: {
    label: "Alta",
    icon: ChevronUpIcon,
    className: "bg-destructive/12 text-destructive dark:bg-destructive/20",
  },
  MEDIUM: {
    label: "Média",
    icon: MinusIcon,
    className: "bg-warning/14 text-warning dark:bg-warning/20",
  },
  LOW: {
    label: "Baixa",
    icon: ChevronDownIcon,
    className: "bg-muted text-muted-foreground",
  },
} as const;

export function WantPriorityBadge({
  priority,
  className,
}: {
  priority: WantPriority;
  className?: string;
}) {
  const { label, icon: Icon, className: tone } = PRIORITY[priority];

  return (
    <Badge variant="secondary" className={cn(tone, "gap-1", className)}>
      <Icon aria-hidden />
      {label}
    </Badge>
  );
}

const STATUS: Record<WantStatus, string> = {
  IDEA: "Ideia",
  CONVERTED: "Convertido em objetivo",
  PURCHASED: "Comprado",
  DISCARDED: "Descartado",
};

export function wantStatusLabel(status: WantStatus): string {
  return STATUS[status];
}
