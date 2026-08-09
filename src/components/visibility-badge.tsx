import { LockIcon, UsersIcon, UserRoundCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Visibility } from "@/lib/types";

const CONFIG = {
  PRIVATE: {
    label: "Privado",
    hint: "Só tu vês este recurso. Nem o owner do Space lhe acede.",
    icon: LockIcon,
    className: "bg-private/12 text-private dark:bg-private/18",
  },
  SPACE: {
    label: "Partilhado",
    hint: "Visível para todos os membros do Space.",
    icon: UsersIcon,
    className: "bg-shared/12 text-shared dark:bg-shared/18",
  },
  CUSTOM: {
    label: "Personalizado",
    hint: "Visível apenas para os membros que escolheste.",
    icon: UserRoundCheckIcon,
    className: "bg-custom/12 text-custom dark:bg-custom/18",
  },
} as const;

export function VisibilityBadge({
  visibility,
  showLabel = true,
  className,
}: {
  visibility: Visibility;
  showLabel?: boolean;
  className?: string;
}) {
  const { label, hint, icon: Icon, className: tone } = CONFIG[visibility];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="secondary"
          className={cn(tone, "gap-1 font-medium", className)}
        >
          <Icon aria-hidden />
          {showLabel ? label : <span className="sr-only">{label}</span>}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{hint}</TooltipContent>
    </Tooltip>
  );
}
