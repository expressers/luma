"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HouseIcon,
  ShieldIcon,
  SlidersHorizontalIcon,
  UserRoundIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/app/settings/profile", label: "Perfil", icon: UserRoundIcon },
  { href: "/app/settings/security", label: "Segurança", icon: ShieldIcon },
  {
    href: "/app/settings/preferences",
    label: "Preferências",
    icon: SlidersHorizontalIcon,
  },
  { href: "/app/settings/space", label: "Espaço", icon: HouseIcon },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto lg:w-52 lg:shrink-0 lg:flex-col lg:overflow-visible">
      {ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors",
              active
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
