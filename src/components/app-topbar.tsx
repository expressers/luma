"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { GlobalSearch } from "@/components/global-search";
import { NotificationsMenu } from "@/components/notifications-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { accountById } from "@/lib/mock";

const SEGMENT_LABELS: Record<string, string> = {
  app: "Luma",
  accounts: "Contas",
  income: "Rendimentos",
  transactions: "Transações",
  goals: "Objetivos",
  wants: "Desejos",
  debts: "Dívidas",
  members: "Membros",
  notifications: "Notificações",
  settings: "Definições",
  profile: "Perfil",
  security: "Segurança",
  space: "Espaço",
};

function labelFor(segment: string): string {
  return SEGMENT_LABELS[segment] ?? accountById(segment)?.name ?? segment;
}

export function AppTopbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => ({
    label: labelFor(segment),
    href: "/" + segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
  }));

  return (
    <header className="bg-background/80 sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-md">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 !h-4" />

      <Breadcrumb className="min-w-0">
        <BreadcrumbList>
          {crumbs.map((crumb) => (
            <Fragment key={crumb.href}>
              <BreadcrumbItem className="max-w-40 truncate">
                {crumb.isLast ? (
                  <BreadcrumbPage className="truncate">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {crumb.isLast ? null : (
                <BreadcrumbSeparator className="hidden sm:block" />
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-1">
        <GlobalSearch />
        <NotificationsMenu />
        <ThemeToggle />
      </div>
    </header>
  );
}
