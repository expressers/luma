import {
  ArrowLeftRightIcon,
  Building2Icon,
  CarIcon,
  CircleDashedIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  HouseIcon,
  LaptopIcon,
  PlugIcon,
  PopcornIcon,
  UtensilsCrossedIcon,
  WalletIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { categoryById } from "@/lib/mock";
import type { TransactionType } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  Wallet: WalletIcon,
  Laptop: LaptopIcon,
  Building2: Building2Icon,
  UtensilsCrossed: UtensilsCrossedIcon,
  House: HouseIcon,
  Car: CarIcon,
  HeartPulse: HeartPulseIcon,
  GraduationCap: GraduationCapIcon,
  Popcorn: PopcornIcon,
  Plug: PlugIcon,
};

export function CategoryIcon({
  categoryId,
  type,
  className,
}: {
  categoryId?: string;
  type: TransactionType;
  className?: string;
}) {
  const Icon =
    type === "TRANSFER"
      ? ArrowLeftRightIcon
      : (ICONS[categoryById(categoryId)?.icon ?? ""] ?? CircleDashedIcon);

  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full",
        type === "INCOME" && "bg-success/10 text-success",
        type === "EXPENSE" && "bg-muted text-muted-foreground",
        type === "TRANSFER" && "bg-shared/10 text-shared",
        className,
      )}
    >
      <Icon className="size-4" />
    </span>
  );
}
