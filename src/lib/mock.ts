import type {
  Category,
  CurrencyCode,
  Debt,
  DebtKind,
  DebtPayment,
  DebtStatus,
  FinancialAccount,
  Goal,
  GoalContribution,
  GoalStatus,
  IncomeFrequency,
  IncomeSource,
  IncomeStatus,
  Member,
  Space,
  Transaction,
  TransactionType,
  Visibility,
  Want,
  WantPriority,
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

const INCOME_SOURCE_SEED: IncomeSource[] = [
  {
    id: "is1",
    name: "Salário",
    payer: "Sonangol E.P.",
    frequency: "MONTHLY",
    expectedAmount: 850_000_00,
    currencyCode: "AOA",
    expectedDay: 25,
    accountId: "a1",
    categoryId: "c-salario",
    ownerId: "u1",
    visibility: "PRIVATE",
    active: true,
    startedAt: "2023-03-01",
  },
  {
    id: "is2",
    name: "Salário",
    payer: "Ministério da Educação",
    frequency: "MONTHLY",
    expectedAmount: 620_000_00,
    currencyCode: "AOA",
    expectedDay: 26,
    accountId: "a7",
    categoryId: "c-salario",
    ownerId: "u2",
    visibility: "SPACE",
    active: true,
    startedAt: "2021-09-01",
  },
  {
    id: "is3",
    name: "Renda do T2 do Benfica",
    payer: "Sr. Adão Miguel",
    frequency: "MONTHLY",
    expectedAmount: 180_000_00,
    currencyCode: "AOA",
    expectedDay: 5,
    accountId: "a2",
    categoryId: "c-rendas",
    ownerId: "u1",
    visibility: "SPACE",
    active: true,
    startedAt: "2024-06-01",
  },
  {
    id: "is4",
    name: "Projeto freelance",
    payer: "Clientes internacionais",
    frequency: "MONTHLY",
    expectedAmount: 1_450_00,
    variable: true,
    currencyCode: "EUR",
    expectedDay: 18,
    accountId: "a6",
    categoryId: "c-freelance",
    ownerId: "u1",
    visibility: "PRIVATE",
    active: true,
    startedAt: "2025-01-15",
  },
  {
    id: "is5",
    name: "Aluguer de equipamento",
    payer: "Estúdio Kianda",
    frequency: "MONTHLY",
    expectedAmount: 75_000_00,
    currencyCode: "AOA",
    expectedDay: 1,
    accountId: "a1",
    categoryId: "c-rendas",
    ownerId: "u1",
    visibility: "SPACE",
    active: true,
    startedAt: "2025-10-01",
  },
  {
    id: "is6",
    name: "Subsídio de férias",
    payer: "Sonangol E.P.",
    frequency: "ANNUAL",
    expectedAmount: 850_000_00,
    currencyCode: "AOA",
    expectedDay: 20,
    expectedMonth: 12,
    accountId: "a1",
    categoryId: "c-salario",
    ownerId: "u1",
    visibility: "PRIVATE",
    active: true,
    startedAt: "2023-12-20",
  },
  {
    id: "is7",
    name: "Consultoria — Projeto Kwanza",
    payer: "Banco Atlântico",
    frequency: "ONE_OFF",
    expectedAmount: 2_400_000_00,
    currencyCode: "AOA",
    accountId: "a1",
    categoryId: "c-freelance",
    ownerId: "u1",
    visibility: "PRIVATE",
    active: false,
    startedAt: "2025-04-10",
  },
];

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
  incomeSourceId?: string;
  ownerId: string;
  visibility: Visibility;
  base: number;
  spread: number;
  day: number;
  /** Número de ocorrências por mês. */
  times?: number;
  currencyCode?: CurrencyCode;
  /** Probabilidade de acontecer num dado mês. */
  chance?: number;
  /** Deixa o mês corrente por preencher, para demonstrar o estado "atrasado". */
  skipCurrentMonth?: boolean;
}

const TEMPLATES: Template[] = [
  // Entradas
  { type: "INCOME", description: "Salário", categoryId: "c-salario", incomeSourceId: "is1", accountId: "a1", ownerId: "u1", visibility: "PRIVATE", base: 850_000_00, spread: 0, day: 25 },
  { type: "INCOME", description: "Salário", categoryId: "c-salario", incomeSourceId: "is2", accountId: "a7", ownerId: "u2", visibility: "SPACE", base: 620_000_00, spread: 0, day: 26 },
  { type: "INCOME", description: "Renda do T2 do Benfica", categoryId: "c-rendas", incomeSourceId: "is3", accountId: "a2", ownerId: "u1", visibility: "SPACE", base: 180_000_00, spread: 0, day: 5 },
  { type: "INCOME", description: "Projeto freelance", categoryId: "c-freelance", incomeSourceId: "is4", accountId: "a6", ownerId: "u1", visibility: "PRIVATE", base: 1_450_00, spread: 600_00, day: 18, currencyCode: "EUR", chance: 0.7 },
  { type: "INCOME", description: "Aluguer de equipamento", categoryId: "c-rendas", incomeSourceId: "is5", accountId: "a1", ownerId: "u1", visibility: "SPACE", base: 75_000_00, spread: 0, day: 1, skipCurrentMonth: true },

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
/** Início do histórico gerado. Antes disto não sabemos nada. */
const HISTORY_START = new Date(
  Date.UTC(TODAY.getUTCFullYear(), TODAY.getUTCMonth() - (MONTHS_OF_HISTORY - 1), 1),
);
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
      if (t.skipCurrentMonth && back === 0) continue;
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
          incomeSourceId: t.incomeSourceId,
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

// ─── Fontes de rendimento ──────────────────────────────────────────────────

const FREQUENCY_LABELS: Record<IncomeFrequency, string> = {
  ONE_OFF: "Pontual",
  WEEKLY: "Semanal",
  MONTHLY: "Mensal",
  QUARTERLY: "Trimestral",
  ANNUAL: "Anual",
};

export function frequencyLabel(frequency: IncomeFrequency): string {
  return FREQUENCY_LABELS[frequency];
}

/** Quantas vezes por ano a fonte paga. `ONE_OFF` não é recorrente. */
const OCCURRENCES_PER_YEAR: Record<IncomeFrequency, number> = {
  ONE_OFF: 0,
  WEEKLY: 52,
  MONTHLY: 12,
  QUARTERLY: 4,
  ANNUAL: 1,
};

/** Valor equivalente mensal, para poder somar fontes de frequências diferentes. */
export function monthlyEquivalent(source: IncomeSource): number {
  const inSpaceCurrency =
    source.currencyCode === "EUR"
      ? source.expectedAmount * EUR_RATE
      : source.expectedAmount;
  return Math.round(
    (inSpaceCurrency * OCCURRENCES_PER_YEAR[source.frequency]) / 12,
  );
}

function nextOccurrence(source: IncomeSource, after: Date): Date | undefined {
  if (source.frequency === "ONE_OFF") return undefined;

  const day = source.expectedDay ?? 1;

  if (source.frequency === "ANNUAL") {
    const month = (source.expectedMonth ?? 1) - 1;
    let year = after.getUTCFullYear();
    let candidate = new Date(Date.UTC(year, month, day, 10));
    if (candidate <= after) {
      year += 1;
      candidate = new Date(Date.UTC(year, month, day, 10));
    }
    return candidate;
  }

  if (source.frequency === "WEEKLY") {
    return new Date(after.getTime() + 7 * DAY);
  }

  const step = source.frequency === "QUARTERLY" ? 3 : 1;
  let candidate = new Date(
    Date.UTC(after.getUTCFullYear(), after.getUTCMonth(), day, 10),
  );
  while (candidate <= after) {
    candidate = new Date(
      Date.UTC(
        candidate.getUTCFullYear(),
        candidate.getUTCMonth() + step,
        day,
        10,
      ),
    );
  }
  return candidate;
}

export interface IncomeSourceView extends IncomeSource {
  status: IncomeStatus;
  lastReceivedAt?: string;
  lastReceivedAmount?: number;
  nextExpectedAt?: string;
  /** Total recebido desta fonte no histórico visível. */
  receivedTotal: number;
}

export function getIncomeSources(
  userId = CURRENT_USER.id,
): IncomeSourceView[] {
  const visibleAccounts = new Set(getAccounts(userId).map((a) => a.id));

  return INCOME_SOURCE_SEED.filter(
    (source) => isVisible(source, userId) && visibleAccounts.has(source.accountId),
  )
    .map((source) => {
      const received = ALL_TRANSACTIONS.filter(
        (t) => t.incomeSourceId === source.id,
      );
      const last = received[0];
      const receivedTotal = received.reduce((sum, t) => sum + t.amount, 0);

      if (!source.active) {
        return {
          ...source,
          status: "INACTIVE" as const,
          lastReceivedAt: last?.occurredAt,
          lastReceivedAmount: last?.amount,
          receivedTotal,
        };
      }

      // Sem recebimentos, a fonte só pode estar em atraso a partir do momento
      // em que temos histórico. Caso contrário, uma fonte anual antiga apareceria
      // em atraso apenas por os pagamentos serem anteriores à janela de dados.
      const since = last
        ? new Date(last.occurredAt)
        : new Date(
            Math.max(Date.parse(source.startedAt), HISTORY_START.getTime()),
          );
      const next = nextOccurrence(source, since);

      let status: IncomeStatus = "PENDING";
      if (next && next < TODAY) status = "LATE";
      else if (last && inWindow(last.occurredAt, 0)) status = "RECEIVED";

      return {
        ...source,
        status,
        lastReceivedAt: last?.occurredAt,
        lastReceivedAmount: last?.amount,
        nextExpectedAt: next?.toISOString(),
        receivedTotal,
      };
    })
    .sort((a, b) => monthlyEquivalent(b) - monthlyEquivalent(a));
}

export interface IncomeSummary {
  expectedMonthly: number;
  receivedWindow: number;
  lateCount: number;
  next?: IncomeSourceView;
  currency: CurrencyCode;
}

export function getIncomeSummary(userId = CURRENT_USER.id): IncomeSummary {
  const sources = getIncomeSources(userId).filter((s) => s.active);

  const expectedMonthly = sources.reduce(
    (sum, source) => sum + monthlyEquivalent(source),
    0,
  );

  const receivedWindow = getTransactions({ userId })
    .filter((t) => t.type === "INCOME" && inWindow(t.occurredAt, 0))
    .reduce((sum, t) => sum + t.amountInSpaceCurrency, 0);

  const upcoming = sources
    .flatMap((source) =>
      source.nextExpectedAt && source.status !== "LATE"
        ? [{ source, at: Date.parse(source.nextExpectedAt) }]
        : [],
    )
    .sort((a, b) => a.at - b.at);

  return {
    expectedMonthly,
    receivedWindow,
    lateCount: sources.filter((s) => s.status === "LATE").length,
    next: upcoming[0]?.source,
    currency: ACTIVE_SPACE.currencyCode,
  };
}

export function getIncomeTransactions(
  options: { limit?: number; userId?: string } = {},
): Transaction[] {
  const rows = getTransactions({ userId: options.userId }).filter(
    (t) => t.type === "INCOME",
  );
  return options.limit ? rows.slice(0, options.limit) : rows;
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

// ─── Dívidas ───────────────────────────────────────────────────────────────

const DEBT_LABELS: Record<DebtKind, string> = {
  MORTGAGE: "Habitação",
  AUTO: "Automóvel",
  PERSONAL: "Pessoal",
  CREDIT_CARD: "Cartão de crédito",
  INSTALMENT: "Prestações",
};

export function debtKindLabel(kind: DebtKind): string {
  return DEBT_LABELS[kind];
}

interface DebtSeed extends Debt {
  /** Salta a prestação mais recente, para demonstrar o estado "em atraso". */
  missedLast?: boolean;
}

const DEBT_SEED: DebtSeed[] = [
  {
    id: "d1",
    name: "Crédito habitação",
    counterparty: "Banco BFA",
    kind: "MORTGAGE",
    direction: "PAYABLE",
    principal: 12_000_000_00,
    interestBps: 1120,
    instalment: 210_000_00,
    dueDay: 5,
    currencyCode: "AOA",
    accountId: "a2",
    ownerId: "u1",
    visibility: "SPACE",
    startedAt: "2022-03-05",
  },
  {
    id: "d2",
    name: "Crédito automóvel",
    counterparty: "Banco BAI",
    kind: "AUTO",
    direction: "PAYABLE",
    principal: 6_500_000_00,
    interestBps: 1450,
    instalment: 185_000_00,
    dueDay: 10,
    currencyCode: "AOA",
    accountId: "a1",
    ownerId: "u1",
    visibility: "SPACE",
    startedAt: "2024-09-10",
  },
  {
    id: "d3",
    name: "Cartão de crédito",
    counterparty: "Banco BAI",
    kind: "CREDIT_CARD",
    direction: "PAYABLE",
    principal: 850_000_00,
    interestBps: 2400,
    instalment: 95_000_00,
    dueDay: 20,
    currencyCode: "AOA",
    accountId: "a1",
    ownerId: "u1",
    visibility: "PRIVATE",
    startedAt: "2025-10-20",
  },
  {
    id: "d4",
    name: "Crédito pessoal",
    counterparty: "Banco Sol",
    kind: "PERSONAL",
    direction: "PAYABLE",
    principal: 1_200_000_00,
    interestBps: 1800,
    instalment: 110_000_00,
    dueDay: 1,
    currencyCode: "AOA",
    accountId: "a1",
    ownerId: "u1",
    visibility: "SPACE",
    startedAt: "2025-11-01",
    missedLast: true,
  },
  {
    id: "d5",
    name: "Computador em prestações",
    counterparty: "Loja Kero",
    kind: "INSTALMENT",
    direction: "PAYABLE",
    principal: 480_000_00,
    interestBps: 0,
    instalment: 40_000_00,
    dueDay: 15,
    currencyCode: "AOA",
    accountId: "a1",
    ownerId: "u1",
    visibility: "PRIVATE",
    startedAt: "2025-07-15",
  },
  {
    id: "d6",
    name: "Empréstimo ao Nuno",
    counterparty: "Nuno Chinhemba",
    kind: "PERSONAL",
    direction: "RECEIVABLE",
    principal: 350_000_00,
    interestBps: 0,
    instalment: 50_000_00,
    dueDay: 28,
    currencyCode: "AOA",
    ownerId: "u1",
    visibility: "SPACE",
    startedAt: "2026-03-28",
  },
  {
    id: "d7",
    name: "Crédito de formação",
    counterparty: "Banco BIC",
    kind: "PERSONAL",
    direction: "PAYABLE",
    principal: 900_000_00,
    interestBps: 1600,
    instalment: 85_000_00,
    dueDay: 12,
    currencyCode: "AOA",
    accountId: "a7",
    ownerId: "u2",
    visibility: "PRIVATE",
    startedAt: "2025-06-12",
  },
];

/**
 * O saldo devedor é derivado do plano de amortização, não guardado. Cada
 * prestação divide-se em juro sobre o capital em dívida e amortização.
 */
function buildDebtPayments(): DebtPayment[] {
  const payments: DebtPayment[] = [];

  for (const debt of DEBT_SEED) {
    let outstanding = debt.principal;
    const monthlyRate = debt.interestBps / 10_000 / 12;
    const start = new Date(debt.startedAt);
    let index = 0;

    for (let month = 0; month < 600 && outstanding > 0; month++) {
      const due = new Date(
        Date.UTC(
          start.getUTCFullYear(),
          start.getUTCMonth() + month,
          debt.dueDay,
          10,
        ),
      );
      if (due > TODAY) break;

      const interestPart = Math.round(outstanding * monthlyRate);
      const principalPart = Math.min(
        debt.instalment - interestPart,
        outstanding,
      );
      // Prestação inferior ao juro nunca amortiza: seria um erro de dados.
      if (principalPart <= 0) break;

      outstanding -= principalPart;
      index += 1;

      payments.push({
        id: `${debt.id}-p${index}`,
        debtId: debt.id,
        amount: interestPart + principalPart,
        interestPart,
        principalPart,
        paidAt: due.toISOString(),
      });
    }

    if (debt.missedLast && payments.at(-1)?.debtId === debt.id) {
      payments.pop();
    }
  }

  return payments.sort((a, b) => Date.parse(b.paidAt) - Date.parse(a.paidAt));
}

const ALL_DEBT_PAYMENTS = buildDebtPayments();

function nextDueDate(debt: Debt, afterIso?: string): Date {
  const from = afterIso ? new Date(afterIso) : new Date(debt.startedAt);
  let candidate = new Date(
    Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), debt.dueDay, 10),
  );
  while (candidate <= from) {
    candidate = new Date(
      Date.UTC(
        candidate.getUTCFullYear(),
        candidate.getUTCMonth() + 1,
        debt.dueDay,
        10,
      ),
    );
  }
  return candidate;
}

export interface DebtView extends Debt {
  outstanding: number;
  paidPrincipal: number;
  paidInterest: number;
  progress: number;
  paymentsMade: number;
  status: DebtStatus;
  lastPaidAt?: string;
  nextDueAt?: string;
  settledAt?: string;
}

function toDebtView(debt: DebtSeed): DebtView {
  const payments = ALL_DEBT_PAYMENTS.filter((p) => p.debtId === debt.id);
  const paidPrincipal = payments.reduce((sum, p) => sum + p.principalPart, 0);
  const paidInterest = payments.reduce((sum, p) => sum + p.interestPart, 0);
  const outstanding = debt.principal - paidPrincipal;
  const last = payments[0];
  const settled = outstanding <= 0;
  const nextDue = settled ? undefined : nextDueDate(debt, last?.paidAt);

  let status: DebtStatus = "ON_TRACK";
  if (settled) status = "SETTLED";
  else if (nextDue && nextDue < TODAY) status = "LATE";

  return {
    ...debt,
    outstanding: Math.max(outstanding, 0),
    paidPrincipal,
    paidInterest,
    progress: debt.principal > 0 ? paidPrincipal / debt.principal : 0,
    paymentsMade: payments.length,
    status,
    lastPaidAt: last?.paidAt,
    nextDueAt: settled ? undefined : nextDue?.toISOString(),
    settledAt: settled ? last?.paidAt : undefined,
  };
}

export function getDebts(userId = CURRENT_USER.id): DebtView[] {
  return DEBT_SEED.filter((debt) => isVisible(debt, userId))
    .map(toDebtView)
    .sort((a, b) => b.outstanding - a.outstanding);
}

export function getDebtPayments(
  debtId: string,
  limit?: number,
): DebtPayment[] {
  const rows = ALL_DEBT_PAYMENTS.filter((p) => p.debtId === debtId);
  return limit ? rows.slice(0, limit) : rows;
}

export interface DebtSummary {
  totalPayable: number;
  totalReceivable: number;
  monthlyInstalments: number;
  interestPaid: number;
  lateCount: number;
  next?: DebtView;
  currency: CurrencyCode;
}

export function getDebtSummary(userId = CURRENT_USER.id): DebtSummary {
  const debts = getDebts(userId);
  const open = debts.filter((d) => d.status !== "SETTLED");

  // As atrasadas são comunicadas pelo alerta; "próximo" tem de ser futuro.
  const upcoming = open
    .flatMap((debt) =>
      debt.direction === "PAYABLE" && debt.nextDueAt && debt.status !== "LATE"
        ? [{ debt, at: Date.parse(debt.nextDueAt) }]
        : [],
    )
    .sort((a, b) => a.at - b.at);

  return {
    totalPayable: open
      .filter((d) => d.direction === "PAYABLE")
      .reduce((sum, d) => sum + d.outstanding, 0),
    totalReceivable: open
      .filter((d) => d.direction === "RECEIVABLE")
      .reduce((sum, d) => sum + d.outstanding, 0),
    monthlyInstalments: open
      .filter((d) => d.direction === "PAYABLE")
      .reduce((sum, d) => sum + d.instalment, 0),
    interestPaid: debts.reduce((sum, d) => sum + d.paidInterest, 0),
    lateCount: open.filter((d) => d.status === "LATE").length,
    next: upcoming[0]?.debt,
    currency: ACTIVE_SPACE.currencyCode,
  };
}

// ─── Objetivos ─────────────────────────────────────────────────────────────

interface GoalSeed extends Goal {
  /** Contribuição regular mensal, base da geração de histórico. */
  monthlyContribution: number;
  /** Meses em que a contribuição falhou, contados a partir do início. */
  skipMonths?: number[];
  kickoff?: number;
}

const GOAL_SEED: GoalSeed[] = [
  {
    id: "g1",
    name: "Fundo de emergência",
    description: "Seis meses de despesas fixas da família.",
    targetAmount: 6_000_000_00,
    currencyCode: "AOA",
    deadline: "2026-12-31",
    accountId: "a3",
    ownerId: "u1",
    assigneeIds: ["u1", "u2"],
    visibility: "SPACE",
    icon: "ShieldCheck",
    startedAt: "2025-02-01",
    monthlyContribution: 250_000_00,
    kickoff: 800_000_00,
  },
  {
    id: "g2",
    name: "Entrada da casa",
    description: "Vinte por cento do valor do T3 no Talatona.",
    targetAmount: 15_000_000_00,
    currencyCode: "AOA",
    deadline: "2028-06-30",
    accountId: "a3",
    ownerId: "u1",
    assigneeIds: ["u1", "u2"],
    visibility: "SPACE",
    icon: "House",
    startedAt: "2025-06-01",
    monthlyContribution: 480_000_00,
  },
  {
    id: "g3",
    name: "Viagem a Portugal",
    description: "Duas semanas em agosto, quatro pessoas.",
    targetAmount: 2_400_000_00,
    currencyCode: "AOA",
    deadline: "2027-02-28",
    accountId: "a3",
    ownerId: "u2",
    assigneeIds: ["u1", "u2", "u3", "u4"],
    visibility: "SPACE",
    icon: "Plane",
    startedAt: "2026-01-01",
    monthlyContribution: 120_000_00,
    skipMonths: [3, 4],
  },
  {
    id: "g4",
    name: "Substituir o carro",
    targetAmount: 4_500_000_00,
    currencyCode: "AOA",
    deadline: "2028-12-31",
    accountId: "a3",
    ownerId: "u1",
    visibility: "PRIVATE",
    icon: "Car",
    startedAt: "2026-03-01",
    monthlyContribution: 150_000_00,
  },
  {
    id: "g5",
    name: "Propinas da Aida",
    description: "Ano letivo 2026/2027.",
    targetAmount: 450_000_00,
    currencyCode: "AOA",
    deadline: "2026-09-30",
    accountId: "a3",
    ownerId: "u1",
    assigneeIds: ["u4"],
    visibility: "CUSTOM",
    sharedWith: ["u2", "u4"],
    icon: "GraduationCap",
    startedAt: "2026-02-01",
    monthlyContribution: 45_000_00,
  },
  {
    id: "g6",
    name: "Computador novo",
    targetAmount: 480_000_00,
    currencyCode: "AOA",
    ownerId: "u1",
    visibility: "PRIVATE",
    icon: "Laptop",
    startedAt: "2025-09-01",
    monthlyContribution: 80_000_00,
  },
  {
    id: "g7",
    name: "Presente de aniversário",
    targetAmount: 600_000_00,
    currencyCode: "AOA",
    deadline: "2026-11-15",
    ownerId: "u2",
    visibility: "PRIVATE",
    icon: "Gift",
    startedAt: "2026-04-01",
    monthlyContribution: 60_000_00,
  },
];

function buildGoalContributions(): GoalContribution[] {
  const rows: GoalContribution[] = [];

  for (const goal of GOAL_SEED) {
    const start = new Date(goal.startedAt);
    let total = 0;
    let index = 0;

    if (goal.kickoff) {
      total += goal.kickoff;
      index += 1;
      rows.push({
        id: `${goal.id}-c${index}`,
        goalId: goal.id,
        amount: goal.kickoff,
        memberId: goal.ownerId,
        occurredAt: start.toISOString(),
      });
    }

    for (let month = 0; month < 240; month++) {
      const at = new Date(
        Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + month, 3, 10),
      );
      if (at > TODAY) break;
      if (goal.skipMonths?.includes(month)) continue;
      if (total >= goal.targetAmount) break;

      const amount = Math.min(
        goal.monthlyContribution,
        goal.targetAmount - total,
      );
      total += amount;
      index += 1;

      // Em objetivos partilhados, as contribuições alternam entre responsáveis.
      const assignees = goal.assigneeIds ?? [goal.ownerId];
      rows.push({
        id: `${goal.id}-c${index}`,
        goalId: goal.id,
        amount,
        memberId: assignees[index % assignees.length],
        occurredAt: at.toISOString(),
      });
    }
  }

  return rows.sort(
    (a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt),
  );
}

const ALL_GOAL_CONTRIBUTIONS = buildGoalContributions();

const MONTH_MS = 30.44 * DAY;

export interface GoalView extends Goal {
  saved: number;
  progress: number;
  remaining: number;
  /** Quanto é preciso poupar por mês para cumprir o prazo. */
  requiredMonthly: number;
  /** Ritmo efetivo dos últimos meses. */
  currentMonthly: number;
  monthsLeft?: number;
  status: GoalStatus;
  lastContributionAt?: string;
  contributionCount: number;
}

function toGoalView(goal: GoalSeed): GoalView {
  const contributions = ALL_GOAL_CONTRIBUTIONS.filter(
    (c) => c.goalId === goal.id,
  );
  const saved = contributions.reduce((sum, c) => sum + c.amount, 0);
  const remaining = Math.max(goal.targetAmount - saved, 0);
  const achieved = remaining === 0;

  const elapsedMonths = Math.max(
    (TODAY.getTime() - Date.parse(goal.startedAt)) / MONTH_MS,
    1,
  );
  const currentMonthly = Math.round(saved / elapsedMonths);

  const monthsLeft = goal.deadline
    ? (Date.parse(goal.deadline) - TODAY.getTime()) / MONTH_MS
    : undefined;

  const requiredMonthly =
    monthsLeft && monthsLeft > 0 ? Math.round(remaining / monthsLeft) : 0;

  let status: GoalStatus = "ON_TRACK";
  if (achieved) status = "ACHIEVED";
  else if (monthsLeft !== undefined && monthsLeft <= 0) status = "OVERDUE";
  else if (requiredMonthly > currentMonthly * 1.15) status = "AT_RISK";

  return {
    ...goal,
    saved,
    progress: goal.targetAmount > 0 ? saved / goal.targetAmount : 0,
    remaining,
    requiredMonthly,
    currentMonthly,
    monthsLeft: monthsLeft !== undefined ? Math.max(monthsLeft, 0) : undefined,
    status,
    lastContributionAt: contributions[0]?.occurredAt,
    contributionCount: contributions.length,
  };
}

export function getGoals(userId = CURRENT_USER.id): GoalView[] {
  const order: Record<GoalStatus, number> = {
    OVERDUE: 0,
    AT_RISK: 1,
    ON_TRACK: 2,
    ACHIEVED: 3,
  };

  return GOAL_SEED.filter((goal) => isVisible(goal, userId))
    .map(toGoalView)
    .sort(
      (a, b) => order[a.status] - order[b.status] || b.progress - a.progress,
    );
}

export function getGoalContributions(
  goalId: string,
  limit?: number,
): GoalContribution[] {
  const rows = ALL_GOAL_CONTRIBUTIONS.filter((c) => c.goalId === goalId);
  return limit ? rows.slice(0, limit) : rows;
}

export interface GoalSummary {
  saved: number;
  target: number;
  progress: number;
  requiredMonthly: number;
  achievedCount: number;
  atRiskCount: number;
  currency: CurrencyCode;
}

export function getGoalSummary(userId = CURRENT_USER.id): GoalSummary {
  const goals = getGoals(userId);
  const saved = goals.reduce((sum, g) => sum + g.saved, 0);
  const target = goals.reduce((sum, g) => sum + g.targetAmount, 0);

  return {
    saved,
    target,
    progress: target > 0 ? saved / target : 0,
    requiredMonthly: goals.reduce((sum, g) => sum + g.requiredMonthly, 0),
    achievedCount: goals.filter((g) => g.status === "ACHIEVED").length,
    atRiskCount: goals.filter(
      (g) => g.status === "AT_RISK" || g.status === "OVERDUE",
    ).length,
    currency: ACTIVE_SPACE.currencyCode,
  };
}

// ─── Desejos ───────────────────────────────────────────────────────────────

const WANT_SEED: Want[] = [
  {
    id: "w1",
    name: "MacBook Pro 14",
    note: "Para substituir o portátil de trabalho, já com quatro anos.",
    estimatedCost: 3_200_000_00,
    currencyCode: "AOA",
    priority: "HIGH",
    status: "IDEA",
    ownerId: "u1",
    visibility: "PRIVATE",
    createdAt: "2026-05-14",
  },
  {
    id: "w2",
    name: "Fim de semana no Namibe",
    note: "Quatro pessoas, três noites, viagem incluída.",
    estimatedCost: 1_800_000_00,
    currencyCode: "AOA",
    priority: "MEDIUM",
    status: "IDEA",
    ownerId: "u1",
    visibility: "SPACE",
    createdAt: "2026-06-02",
  },
  {
    id: "w3",
    name: "Bicicleta elétrica",
    estimatedCost: 950_000_00,
    currencyCode: "AOA",
    priority: "LOW",
    status: "IDEA",
    ownerId: "u2",
    visibility: "SPACE",
    createdAt: "2026-07-21",
  },
  {
    id: "w4",
    name: "PlayStation 5",
    note: "Pedido do Nuno, a discutir em família.",
    estimatedCost: 780_000_00,
    currencyCode: "AOA",
    priority: "LOW",
    status: "IDEA",
    ownerId: "u3",
    visibility: "SPACE",
    createdAt: "2026-07-30",
  },
  {
    id: "w5",
    name: "Máquina de café",
    estimatedCost: 320_000_00,
    currencyCode: "AOA",
    priority: "MEDIUM",
    status: "PURCHASED",
    ownerId: "u1",
    visibility: "SPACE",
    createdAt: "2026-03-08",
  },
  {
    id: "w6",
    name: "Computador novo",
    note: "Promovido a objetivo em setembro.",
    estimatedCost: 480_000_00,
    currencyCode: "AOA",
    priority: "HIGH",
    status: "CONVERTED",
    goalId: "g6",
    ownerId: "u1",
    visibility: "PRIVATE",
    createdAt: "2025-08-19",
  },
  {
    id: "w7",
    name: "Curso de fotografia",
    estimatedCost: 180_000_00,
    currencyCode: "AOA",
    priority: "LOW",
    status: "DISCARDED",
    ownerId: "u1",
    visibility: "PRIVATE",
    createdAt: "2026-01-11",
  },
  {
    id: "w8",
    name: "Telemóvel novo",
    estimatedCost: 1_100_000_00,
    currencyCode: "AOA",
    priority: "HIGH",
    status: "IDEA",
    ownerId: "u2",
    visibility: "PRIVATE",
    createdAt: "2026-06-27",
  },
];

const PRIORITY_ORDER: Record<WantPriority, number> = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
};

export interface WantView extends Want {
  /** Meses de poupança ao ritmo atual. `undefined` se não sobra nada. */
  monthsToAfford?: number;
  goalName?: string;
}

export function getWants(userId = CURRENT_USER.id): WantView[] {
  const summary = getDashboardSummary(userId);
  const monthlySurplus = summary.income - summary.expense;

  return WANT_SEED.filter((want) => isVisible(want, userId))
    .map((want) => ({
      ...want,
      monthsToAfford:
        monthlySurplus > 0 ? want.estimatedCost / monthlySurplus : undefined,
      goalName: want.goalId
        ? GOAL_SEED.find((g) => g.id === want.goalId)?.name
        : undefined,
    }))
    .sort(
      (a, b) =>
        PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] ||
        b.estimatedCost - a.estimatedCost,
    );
}

export interface WantSummary {
  openCount: number;
  openTotal: number;
  highPriorityTotal: number;
  monthlySurplus: number;
  currency: CurrencyCode;
}

export function getWantSummary(userId = CURRENT_USER.id): WantSummary {
  const wants = getWants(userId).filter((w) => w.status === "IDEA");
  const summary = getDashboardSummary(userId);

  return {
    openCount: wants.length,
    openTotal: wants.reduce((sum, w) => sum + w.estimatedCost, 0),
    highPriorityTotal: wants
      .filter((w) => w.priority === "HIGH")
      .reduce((sum, w) => sum + w.estimatedCost, 0),
    monthlySurplus: summary.income - summary.expense,
    currency: ACTIVE_SPACE.currencyCode,
  };
}
