"use client";

import { useState } from "react";
import {
  BriefcaseIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  HouseIcon,
  PlusIcon,
  UserRoundIcon,
  UsersRoundIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SPACES, ACTIVE_SPACE } from "@/lib/mock";
import type { Space, SpaceType } from "@/lib/types";

const SPACE_ICONS: Record<SpaceType, typeof UserRoundIcon> = {
  PERSONAL: UserRoundIcon,
  FAMILY: UsersRoundIcon,
  HOUSEHOLD: HouseIcon,
  BUSINESS: BriefcaseIcon,
};

const SPACE_LABELS: Record<SpaceType, string> = {
  PERSONAL: "Pessoal",
  FAMILY: "Família",
  HOUSEHOLD: "Casa",
  BUSINESS: "Negócio",
};

export function SpaceSwitcher() {
  const { isMobile } = useSidebar();
  const [active, setActive] = useState<Space>(ACTIVE_SPACE);
  const ActiveIcon = SPACE_ICONS[active.type];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent"
            >
              <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <ActiveIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-medium">{active.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {SPACE_LABELS[active.type]} ·{" "}
                  {active.memberCount === 1
                    ? "1 membro"
                    : `${active.memberCount} membros`}
                </span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4 opacity-60" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-60"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Os teus espaços
            </DropdownMenuLabel>
            {SPACES.map((space) => {
              const Icon = SPACE_ICONS[space.type];
              return (
                <DropdownMenuItem
                  key={space.id}
                  onSelect={() => setActive(space)}
                  className="gap-2 p-2"
                >
                  <div className="border-border flex size-6 items-center justify-center rounded-md border">
                    <Icon className="size-3.5 shrink-0" />
                  </div>
                  <span className="flex-1 truncate">{space.name}</span>
                  {space.id === active.id ? (
                    <CheckIcon className="text-primary size-4" />
                  ) : null}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="border-border flex size-6 items-center justify-center rounded-md border border-dashed">
                <PlusIcon className="size-3.5" />
              </div>
              <span className="text-muted-foreground">Criar novo espaço</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
