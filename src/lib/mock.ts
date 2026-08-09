import type {
  Category,
  CurrencyCode,
  FinancialAccount,
  Member,
  Space,
  Transaction,
  TransactionType,
} from "@/lib/types";

/**
 * Dados de demonstração. Substituídos pela Data Access Layer (`src/data/**`)
 * quando o Prisma entrar. As assinaturas destas funções são propositadamente
 * as que a DAL vai expor, para que a UI não precise de mudar.
 */

export const CURRENT_USER = {
  id: "u1",
  name: "Tchiinhemba Kiala",
  email: "tchiinhemba@luma.app",
  initials: "TK",
};

export const SPACES: Space[] = [
  {
    id: "s1",
    name: "Pessoal",
    type: "PERSONAL",
    currencyCode: "AOA",
    role: "owner",
    memberCount: 1,
  },
  {
    id: "s2",
    name: "Família Chinhemba",
    type: "FAMILY",
    currencyCode: "AOA",
    role: "owner",
    memberCount: 4,
  },
  {
    id: "s3",
    name: "Casa da Praia",
    type: "HOUSEHOLD",
    currencyCode: "AOA",
    role: "admin",
    memberCount: 3,
  },
];

export const ACTIVE_SPACE = SPACES[1];

export const MEMBERS: Member[] = [
  {
    id: "u1",
    name: "Tchiinhemba Kiala",
    email: "tchiinhemba@luma.app",
    role: "owner",
    joinedAt: "2025-11-02",
    status: "ACTIVE",
  },
  {
    id: "u2",
    name: "Marta Chinhemba",
    email: "marta@exemplo.ao",
    role: "admin",
    joinedAt: "2025-11-04",
    status: "ACTIVE",
  },
  {
    id: "u3",
    name: "Nuno Chinhemba",
    email: "nuno@exemplo.ao",
    role: "member",
    joinedAt: "2026-01-18",
    status: "ACTIVE",
  },
  {
    id: "u4",
    name: "Aida Chinhemba",
    email: "aida@exemplo.ao",
    role: "child",
    joinedAt: "2026-02-09",
    status: "ACTIVE",
  },
  {
    id: "u5",
    name: "Paulo Chinhemba",
    email: "paulo@exemplo.ao",
    role: "member",
    joinedAt: "2026-08-04",
    status: "INVITED",
  },
];

export function memberById(id: string): Member | undefined {
  return MEMBERS.find((m) => m.id === id);
}

export const CATEGORIES: Category[] = [
  { id: "c-salario", name: "Salário", kind: "INCOME", icon: "Wallet" },
  { id: "c-freelance", name: "Freelance", kind: "INCOME", icon: "Laptop" },
  { id: "c-rendas", name: "Rendas", kind: "INCOME", icon: "Building2" },
  { id: "c-alimentacao", name: "Alimentação", kind: "EXPENSE", icon: "UtensilsCrossed" },
  { id: "c-habitacao", name: "Habitação", kind: "EXPENSE", icon: "House" },
  { id: "c-transporte", name: "Transporte", kind: "EXPENSE", icon: "Car" },
  { id: "c-saude", name: "Saúde", kind: "EXPENSE", icon: "HeartPulse" },
  { id: "c-educacao", name: "Educação", kind: "EXPENSE", icon: "GraduationCap" },
  { id: "c-lazer", name: "Lazer", kind: "EXPENSE", icon: "Popcorn" },
  { id: "c-servicos", name: "Serviços", kind: "EXPENSE", icon: "Plug" },
];

export function categoryById(id?: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

/**
 * Saldos que queremos ver hoje. O saldo de abertura é derivado destes valores
 * menos o efeito das transações, para que o extrato e o saldo batam certo.
 */
const TARGET_BALANCES: Record<string, number> = {
  a1: 2_450_000_00,
  a2: 1_180_500_00,
  a3: 3_750_000_00,
  a4: 85_000_00,
  a5: 42_300_00,
  a6: 3_240_50,
  a7: 890_000_00,
};

const ACCOUNT_SEED: Omit<FinancialAccount, "currentBalance">[] = [
  {
    id: "a1",
    name: "Conta à Ordem",
    institution: "Banco BAI",
    type: "BANK",
    currencyCode: "AOA",
    visibility: "SPACE",
    ownerId: "u1",
    archived: false,
  },
  {
    id: "a2",
    name: "Conta Conjunta",
    institution: "Banco BFA",
    type: "JOINT",
    currencyCode: "AOA",
    visibility: "SPACE",
    ownerId: "u1",
    archived: false,
  },
  {
    id: "a3",
    name: "Fundo de Emergência",
    institution: "Banco BAI",
    type: "SAVINGS",
    currencyCode: "AOA",
    visibility: "SPACE",
    ownerId: "u1",
    archived: false,
  },
  {
    id: "a4",
    name: "Carteira",
    type: "CASH",
    currencyCode: "AOA",
    visibility: "PRIVATE",
    ownerId: "u1",
    archived: false,
  },
  {
    id: "a5",
    name: "Unitel Money",
    institution: "Unitel",
    type: "DIGITAL_WALLET",
    currencyCode: "AOA",
    visibility: "PRIVATE",
    ownerId: "u1",
    archived: false,
  },
  {
    id: "a6",
    name: "Revolut",
    institution: "Revolut Bank UAB",
    type: "BANK",
    currencyCode: "EUR",
    visibility: "PRIVATE",
    ownerId: "u1",
    archived: false,
  },
  {
    id: "a7",
    name: "Conta da Marta",
    institution: "Banco BIC",
    type: "BANK",
    currencyCode: "AOA",
    visibility: "CUSTOM",
    ownerId: "u2",
    sharedWith: ["u1"],
    archived: false,
  },
];

/** 1 EUR ≈ 990 Kz. Taxa congelada, como no modelo de dados. */
const EUR_RATE = 990;

// ─── Gerador determinístico ────────────────────────────────────────────────

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const random = seededRandom(20260809);

function vary(base: number, spread: number): number {
  return Math.round((base + (random() - 0.5) * 2 * spread) / 100) * 100;
}

interface Template {
  type: TransactionType;
  description: string;
  categoryId?: string;
  accountId: string;
  counterAccountId?: string;
  ownerId: string;
  visibility: FinancialAccount["visibility"];
  base: number;
  spread: number;
  day: number;
  /** Número de ocorrências por mês. */
  times?: number;
  currencyCode?: CurrencyCode;
  /** Probabilidade de acontecer num dado mês. */
  chance?: number;
}

const TEMPLATES: Template[] = [
  // Entradas
  { type: "INCOME", description: "Salário", categoryId: "c-salario", accountId: "a1", ownerId: "u1", visibility: "PRIVATE", base: 850_000_00, spread: 0, day: 25 },
  { type: "INCOME", description: "Salário", categoryId: "c-salario", accountId: "a7", ownerId: "u2", visibility: "SPACE", base: 620_000_00, spread: 0, day: 26 },
  { type: "INCOME", description: "Renda do T2 do Benfica", categoryId: "c-rendas", accountId: "a2", ownerId: "u1", visibility: "SPACE", base: 180_000_00, spread: 0, day: 5 },
  { type: "INCOME", description: "Projeto freelance", categoryId: "c-freelance", accountId: "a6", ownerId: "u1", visibility: "PRIVATE", base: 1_450_00, spread: 600_00, day: 18, currencyCode: "EUR", chance: 0.7 },

  // Habitação e serviços
  { type: "EXPENSE", description: "Renda de casa", categoryId: "c-habitacao", accountId: "a2", ownerId: "u1", visibility: "SPACE", base: 450_000_00, spread: 0, day: 3 },
  { type: "EXPENSE", description: "Apoio doméstico", categoryId: "c-habitacao", accountId: "a2", ownerId: "u1", visibility: "SPACE", base: 65_000_00, spread: 0, day: 28 },
  { type: "EXPENSE", description: "ENDE — eletricidade", categoryId: "c-servicos", accountId: "a2", ownerId: "u1", visibility: "SPACE", base: 32_500_00, spread: 6_000_00, day: 12 },
  { type: "EXPENSE", description: "Internet fibra", categoryId: "c-servicos", accountId: "a2", ownerId: "u1", visibility: "SPACE", base: 25_000_00, spread: 0, day: 10 },
  { type: "EXPENSE", description: "Subscrições digitais", categoryId: "c-servicos", accountId: "a5", ownerId: "u1", visibility: "PRIVATE", base: 8_500_00, spread: 0, day: 14 },

  // Dia a dia
  { type: "EXPENSE", description: "Supermercado Kero", categoryId: "c-alimentacao", accountId: "a2", ownerId: "u1", visibility: "SPACE", base: 52_000_00, spread: 18_000_00, day: 6, times: 4 },
  { type: "EXPENSE", description: "Combustível", categoryId: "c-transporte", accountId: "a1", ownerId: "u1", visibility: "SPACE", base: 21_000_00, spread: 5_000_00, day: 4, times: 3 },
  { type: "EXPENSE", description: "Táxi e transportes", categoryId: "c-transporte", accountId: "a4", ownerId: "u1", visibility: "PRIVATE", base: 4_500_00, spread: 2_000_00, day: 9, times: 3 },
  { type: "EXPENSE", description: "Almoço fora", categoryId: "c-alimentacao", accountId: "a4", ownerId: "u1", visibility: "PRIVATE", base: 7_500_00, spread: 3_000_00, day: 11, times: 2 },

  // Família
  { type: "EXPENSE", description: "Colégio da Aida", categoryId: "c-educacao", accountId: "a2", ownerId: "u1", visibility: "SPACE", base: 95_000_00, spread: 0, day: 5 },
  { type: "EXPENSE", description: "Consulta e farmácia", categoryId: "c-saude", accountId: "a2", ownerId: "u2", visibility: "SPACE", base: 28_000_00, spread: 12_000_00, day: 17, chance: 0.6 },
  { type: "EXPENSE", description: "Ginásio", categoryId: "c-lazer", accountId: "a1", ownerId: "u1", visibility: "SPACE", base: 18_000_00, spread: 0, day: 8 },
  { type: "EXPENSE", description: "Jantar em família", categoryId: "c-lazer", accountId: "a2", ownerId: "u1", visibility: "SPACE", base: 34_000_00, spread: 14_000_00, day: 21, times: 2 },

  // Privado de outro membro — nunca deve chegar ao utilizador atual
  { type: "EXPENSE", description: "Presente surpresa", categoryId: "c-lazer", accountId: "a7", ownerId: "u2", visibility: "PRIVATE", base: 120_000_00, spread: 40_000_00, day: 15, chance: 0.5 },

  // Poupança
  { type: "TRANSFER", description: "Reforço da poupança", accountId: "a1", counterAccountId: "a3", ownerId: "u1", visibility: "SPACE", base: 200_000_00, spread: 0, day: 26 },
];

const TODAY = new Date("2026-08-09T12:00:00Z");
const MONTHS_OF_HISTORY = 7;
/** O mês corrente está incompleto, por isso fica fora do gráfico mensal. */
const COMPLETE_MONTHS = MONTHS_OF_HISTORY - 1;

function buildTransactions(): Transaction[] {
  const out: Transaction[] = [];
  let counter = 0;

  for (let back = MONTHS_OF_HISTORY - 1; back >= 0; back--) {
    const cursor = new Date(
      Date.UTC(TODAY.getUTCFullYear(), TODAY.getUTCMonth() - back, 1),
    );

    for (const t of TEMPLATES) {
      if (t.chance !== undefined && random() > t.chance) continue;

      const occurrences = t.times ?? 1;
      for (let i = 0; i < occurrences; i++) {
        const day = Math.min(t.day + i * 7, 28);
        const date = new Date(
          Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), day, 10),
        );
        if (date > TODAY) continue;

        const currencyCode = t.currencyCode ?? "AOA";
        const amount = t.spread === 0 ? t.base : vary(t.base, t.spread);

        out.push({
          id: `t${++counter}`,
          type: t.type,
          amount,
          currencyCode,
          amountInSpaceCurrency:
            currencyCode === "EUR" ? amount * EUR_RATE : amount,
          description: t.description,
          categoryId: t.categoryId,
          accountId: t.accountId,
          counterAccountId: t.counterAccountId,
          ownerId: t.ownerId,
          visibility: t.visibility,
          occurredAt: date.toISOString(),
        });
      }
    }
  }

  return out.sort(
    (a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt),
  );
}

const ALL_TRANSACTIONS = buildTransactions();

function netFlow(accountId: string): number {
  return ALL_TRANSACTIONS.reduce((balance, t) => {
    if (t.accountId === accountId) {
      return t.type === "INCOME" ? balance + t.amount : balance - t.amount;
    }
    if (t.counterAccountId === accountId) {
      return balance + t.amount;
    }
    return balance;
  }, 0);
}

const ALL_ACCOUNTS: FinancialAccount[] = ACCOUNT_SEED.map((a) => ({
  ...a,
  currentBalance: TARGET_BALANCES[a.id] ?? 0,
}));

/** Saldo de abertura implícito, mostrado no detalhe da conta. */
export function openingBalance(accountId: string): number {
  return (TARGET_BALANCES[accountId] ?? 0) - netFlow(accountId);
}

// ─── Regras de visibilidade (espelham o motor `can()` do PRD) ──────────────

function isVisible(
  resource: { ownerId: string; visibility: string; sharedWith?: string[] },
  userId: string,
): boolean {
  if (resource.ownerId === userId) return true;
  if (resource.visibility === "SPACE") return true;
  if (resource.visibility === "CUSTOM") {
    return resource.sharedWith?.includes(userId) ?? false;
  }
  return false;
}

// ─── Consultas ─────────────────────────────────────────────────────────────

export function getAccounts(userId = CURRENT_USER.id): FinancialAccount[] {
  return ALL_ACCOUNTS.filter((a) => isVisible(a, userId));
}

export function getAccount(
  id: string,
  userId = CURRENT_USER.id,
): FinancialAccount | undefined {
  return getAccounts(userId).find((a) => a.id === id);
}

export function accountById(id: string): FinancialAccount | undefined {
  return ALL_ACCOUNTS.find((a) => a.id === id);
}

export function getTransactions(
  options: { accountId?: string; limit?: number; userId?: string } = {},
): Transaction[] {
  const { accountId, limit, userId = CURRENT_USER.id } = options;
  const visibleAccounts = new Set(getAccounts(userId).map((a) => a.id));

  const rows = ALL_TRANSACTIONS.filter((t) => {
    if (!isVisible(t, userId)) return false;
    if (!visibleAccounts.has(t.accountId)) return false;
    if (accountId && t.accountId !== accountId && t.counterAccountId !== accountId) {
      return false;
    }
    return true;
  });

  return limit ? rows.slice(0, limit) : rows;
}

/** Número de recursos que existem mas que o utilizador não pode ver. */
export function getHiddenCount(userId = CURRENT_USER.id): number {
  return ALL_TRANSACTIONS.filter((t) => !isVisible(t, userId)).length;
}

const DAY = 24 * 60 * 60 * 1000;
const WINDOW_DAYS = 30;

/**
 * Janela móvel em vez de mês de calendário: a meio do mês, um mês de calendário
 * mostra os gastos já feitos contra os salários que ainda não entraram, o que
 * dá métricas enganadoras.
 */
function inWindow(iso: string, offsetWindows: number): boolean {
  const end = TODAY.getTime() - offsetWindows * WINDOW_DAYS * DAY;
  const start = end - WINDOW_DAYS * DAY;
  const at = Date.parse(iso);
  return at > start && at <= end;
}

export interface DashboardSummary {
  totalBalance: number;
  income: number;
  expense: number;
  previousIncome: number;
  previousExpense: number;
  savingsRate: number;
  currency: CurrencyCode;
}

export function getDashboardSummary(
  userId = CURRENT_USER.id,
): DashboardSummary {
  const accounts = getAccounts(userId);
  const totalBalance = accounts.reduce(
    (sum, a) =>
      sum +
      (a.currencyCode === "EUR"
        ? a.currentBalance * EUR_RATE
        : a.currentBalance),
    0,
  );

  let income = 0;
  let expense = 0;
  let previousIncome = 0;
  let previousExpense = 0;

  for (const t of getTransactions({ userId })) {
    if (t.type === "TRANSFER") continue;
    const value = t.amountInSpaceCurrency;
    if (inWindow(t.occurredAt, 0)) {
      if (t.type === "INCOME") income += value;
      else expense += value;
    } else if (inWindow(t.occurredAt, 1)) {
      if (t.type === "INCOME") previousIncome += value;
      else previousExpense += value;
    }
  }

  return {
    totalBalance,
    income,
    expense,
    previousIncome,
    previousExpense,
    savingsRate: income > 0 ? (income - expense) / income : 0,
    currency: ACTIVE_SPACE.currencyCode,
  };
}

export interface MonthlyPoint {
  month: string;
  income: number;
  expense: number;
}

export function getMonthlySeries(userId = CURRENT_USER.id): MonthlyPoint[] {
  const buckets = new Map<string, MonthlyPoint>();

  for (let back = COMPLETE_MONTHS; back >= 1; back--) {
    const d = new Date(
      Date.UTC(TODAY.getUTCFullYear(), TODAY.getUTCMonth() - back, 1),
    );
    buckets.set(d.toISOString().slice(0, 7), {
      month: d.toISOString(),
      income: 0,
      expense: 0,
    });
  }

  for (const t of getTransactions({ userId })) {
    if (t.type === "TRANSFER") continue;
    const key = t.occurredAt.slice(0, 7);
    const bucket = buckets.get(key);
    if (!bucket) continue;
    if (t.type === "INCOME") bucket.income += t.amountInSpaceCurrency;
    else bucket.expense += t.amountInSpaceCurrency;
  }

  return [...buckets.values()];
}

export interface CategoryTotal {
  categoryId: string;
  name: string;
  total: number;
  share: number;
}

export function getCategoryBreakdown(
  userId = CURRENT_USER.id,
): CategoryTotal[] {
  const totals = new Map<string, number>();

  for (const t of getTransactions({ userId })) {
    if (t.type !== "EXPENSE" || !t.categoryId) continue;
    if (!inWindow(t.occurredAt, 0)) continue;
    totals.set(
      t.categoryId,
      (totals.get(t.categoryId) ?? 0) + t.amountInSpaceCurrency,
    );
  }

  const grandTotal = [...totals.values()].reduce((a, b) => a + b, 0);

  return [...totals.entries()]
    .map(([categoryId, total]) => ({
      categoryId,
      name: categoryById(categoryId)?.name ?? "Outros",
      total,
      share: grandTotal > 0 ? total / grandTotal : 0,
    }))
    .sort((a, b) => b.total - a.total);
}
