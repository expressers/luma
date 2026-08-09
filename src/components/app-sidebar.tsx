"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRightIcon,
  BellIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon,
  WandSparklesIcon,
} from "lucide-react";

import { SpaceSwitcher } from "@/components/space-switcher";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const NAV_MAIN = [
  { title: "Dashboard", href: "/app", icon: LayoutDashboardIcon },
  { title: "Contas", href: "/app/accounts", icon: WalletIcon },
  { title: "Rendimentos", href: "/app/income", icon: TrendingUpIcon },
  { title: "Transações", href: "/app/transactions", icon: ArrowLeftRightIcon },
];

const NAV_PLANNING = [
  { title: "Objetivos", href: "/app/goals", icon: TargetIcon },
  { title: "Desejos", href: "/app/wants", icon: SparklesIcon },
  { title: "Dívidas", href: "/app/debts", icon: LandmarkIcon },
];

const NAV_SPACE = [
  { title: "Membros", href: "/app/members", icon: UsersIcon, badge: "1" },
  { title: "Notificações", href: "/app/notifications", icon: BellIcon },
  { title: "Definições", href: "/app/settings/profile", icon: SettingsIcon },
];

const NAV_SOON = [
  { title: "Património", icon: ShieldCheckIcon },
  { title: "Life Insights", icon: WandSparklesIcon },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SpaceSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Finanças</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_MAIN.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Planeamento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_PLANNING.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Espaço</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_SPACE.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge ? (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Em breve</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_SOON.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    disabled
                    className="text-muted-foreground/70"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                    <Badge variant="outline" className="ml-auto text-[10px]">
                      Fase 2
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
