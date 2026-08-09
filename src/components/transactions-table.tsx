"use client";

import { useMemo, useState } from "react";
import { FilterXIcon, SearchIcon } from "lucide-react";

import { CategoryIcon } from "@/components/category-icon";
import { VisibilityBadge } from "@/components/visibility-badge";
import { amountToneClass, signedAmount } from "@/components/transaction-row";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CATEGORIES, accountById, categoryById, memberById } from "@/lib/mock";
import { formatDate } from "@/lib/money";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

const ALL = "all";
const PAGE_SIZE = 25;

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () =>
      transactions.filter((t) => {
        if (type !== ALL && t.type !== type) return false;
        if (category !== ALL && t.categoryId !== category) return false;
        if (query) {
          const haystack =
            `${t.description} ${categoryById(t.categoryId)?.name ?? ""} ${accountById(t.accountId)?.name ?? ""}`.toLowerCase();
          if (!haystack.includes(query.toLowerCase())) return false;
        }
        return true;
      }),
    [transactions, query, type, category],
  );

  const hasFilters = query !== "" || type !== ALL || category !== ALL;

  const clear = () => {
    setQuery("");
    setType(ALL);
    setCategory(ALL);
    setVisible(PAGE_SIZE);
  };

  const rows = filtered.slice(0, visible);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Procurar movimento…"
            className="pl-9"
            aria-label="Procurar movimento"
          />
        </div>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="sm:w-40" aria-label="Filtrar por tipo">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todos os tipos</SelectItem>
            <SelectItem value="INCOME">Entradas</SelectItem>
            <SelectItem value="EXPENSE">Saídas</SelectItem>
            <SelectItem value="TRANSFER">Transferências</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="sm:w-48" aria-label="Filtrar por categoria">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todas as categorias</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters ? (
          <Button variant="ghost" onClick={clear}>
            <FilterXIcon />
            Limpar
          </Button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle>Nenhum movimento encontrado</EmptyTitle>
            <EmptyDescription>
              Experimenta ajustar a pesquisa ou limpar os filtros.
            </EmptyDescription>
          </EmptyHeader>
          <Button variant="outline" onClick={clear}>
            Limpar filtros
          </Button>
        </Empty>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Descrição</TableHead>
                <TableHead className="hidden md:table-cell">Conta</TableHead>
                <TableHead className="hidden lg:table-cell">Membro</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Visibilidade
                </TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((t) => {
                const owner = memberById(t.ownerId);
                return (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <CategoryIcon categoryId={t.categoryId} type={t.type} />
                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {t.description}
                          </p>
                          <p className="text-muted-foreground truncate text-xs">
                            {categoryById(t.categoryId)?.name ??
                              "Transferência"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell">
                      {accountById(t.accountId)?.name}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className="text-[10px]">
                            {initials(owner?.name ?? "?")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground text-sm">
                          {owner?.name.split(" ")[0]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <VisibilityBadge visibility={t.visibility} />
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {formatDate(t.occurredAt)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "tabular text-right font-medium whitespace-nowrap",
                        amountToneClass(t.type),
                      )}
                    >
                      {signedAmount(t)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        {rows.length < filtered.length ? (
          <Button
            variant="outline"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Ver mais movimentos
          </Button>
        ) : null}
        <p className="text-muted-foreground text-xs">
          A mostrar {rows.length} de {filtered.length} movimentos visíveis para
          ti.
        </p>
      </div>
    </div>
  );
}
