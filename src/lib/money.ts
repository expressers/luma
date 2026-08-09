import type { CurrencyCode } from "@/lib/types";

const LOCALE = "pt-PT";

/**
 * Todos os valores circulam em unidades mínimas (inteiros) para evitar erros de
 * arredondamento. Estas são as casas decimais de cada moeda suportada.
 */
const MINOR_UNITS: Record<CurrencyCode, number> = {
  AOA: 2,
  EUR: 2,
  USD: 2,
  BRL: 2,
};

export function toMajor(minor: number, currency: CurrencyCode): number {
  return minor / 10 ** MINOR_UNITS[currency];
}

export function formatMoney(
  minor: number,
  currency: CurrencyCode,
  options: { signed?: boolean; hideDecimals?: boolean } = {},
): string {
  const { signed = false, hideDecimals = false } = options;
  const digits = hideDecimals ? 0 : MINOR_UNITS[currency];

  const formatted = new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Math.abs(toMajor(minor, currency)));

  if (signed && minor !== 0) {
    return `${minor > 0 ? "+" : "−"} ${formatted}`;
  }
  return minor < 0 ? `− ${formatted}` : formatted;
}

/** Versão abreviada para eixos de gráficos, onde o espaço é escasso. */
export function formatMoneyCompact(
  minor: number,
  currency: CurrencyCode,
): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(toMajor(minor, currency));
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(
  iso: string,
  style: "short" | "long" = "short",
): string {
  return new Intl.DateTimeFormat(
    LOCALE,
    style === "short"
      ? { day: "2-digit", month: "short" }
      : { day: "2-digit", month: "long", year: "numeric" },
  ).format(new Date(iso));
}

export function formatMonth(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    month: "short",
  }).format(new Date(iso));
}
