"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRightIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { getAccounts } from "@/lib/mock";
import { formatMoney } from "@/lib/money";

const PAGES = [
  { title: "Dashboard", href: "/app", icon: LayoutDashboardIcon },
  { title: "Contas", href: "/app/accounts", icon: WalletIcon },
  { title: "Transações", href: "/app/transactions", icon: ArrowLeftRightIcon },
  { title: "Membros", href: "/app/members", icon: UsersIcon },
  { title: "Definições", href: "/app/settings/profile", icon: SettingsIcon },
];

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const accounts = getAccounts();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="text-muted-foreground hidden w-56 justify-start gap-2 font-normal md:flex lg:w-72"
      >
        <SearchIcon className="size-4" />
        Pesquisar…
        <kbd className="bg-muted text-muted-foreground ml-auto rounded border px-1.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Pesquisar"
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <SearchIcon />
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Pesquisa global"
        description="Procura páginas, contas e transações"
      >
        <CommandInput placeholder="Escreve para procurar…" />
        <CommandList>
          <CommandEmpty>Sem resultados.</CommandEmpty>
          <CommandGroup heading="Ir para">
            {PAGES.map((page) => (
              <CommandItem
                key={page.href}
                value={page.title}
                onSelect={() => go(page.href)}
              >
                <page.icon />
                {page.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Contas">
            {accounts.map((account) => (
              <CommandItem
                key={account.id}
                value={`${account.name} ${account.institution ?? ""}`}
                onSelect={() => go(`/app/accounts/${account.id}`)}
              >
                <WalletIcon />
                <span>{account.name}</span>
                <span className="text-muted-foreground tabular ml-auto text-xs">
                  {formatMoney(account.currentBalance, account.currencyCode, {
                    hideDecimals: true,
                  })}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
