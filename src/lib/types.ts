export type SpaceType = "PERSONAL" | "FAMILY" | "HOUSEHOLD" | "BUSINESS";

export type MemberRole = "owner" | "admin" | "member" | "child";

export type Visibility = "PRIVATE" | "SPACE" | "CUSTOM";

export type FinancialAccountType =
  | "BANK"
  | "CASH"
  | "SAVINGS"
  | "DIGITAL_WALLET"
  | "JOINT";

export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER";

export type CurrencyCode = "AOA" | "EUR" | "USD" | "BRL";

export interface Space {
  id: string;
  name: string;
  type: SpaceType;
  currencyCode: CurrencyCode;
  role: MemberRole;
  memberCount: number;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  avatarUrl?: string;
  joinedAt: string;
  status: "ACTIVE" | "INVITED";
}

export interface FinancialAccount {
  id: string;
  name: string;
  institution?: string;
  type: FinancialAccountType;
  currencyCode: CurrencyCode;
  /** Unidades mínimas da moeda. Nunca usar vírgula flutuante para dinheiro. */
  currentBalance: number;
  visibility: Visibility;
  ownerId: string;
  archived: boolean;
  sharedWith?: string[];
}

export interface Category {
  id: string;
  name: string;
  kind: TransactionType;
  icon: string;
}

export type IncomeFrequency =
  | "ONE_OFF"
  | "WEEKLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "ANNUAL";

/**
 * O plano: quanto se espera receber, de quem e quando. As entradas reais são
 * `Transaction` com `type: "INCOME"`, ligadas por `incomeSourceId`.
 */
export interface IncomeSource {
  id: string;
  name: string;
  payer: string;
  frequency: IncomeFrequency;
  /** Unidades mínimas. Estimativa quando `variable` é true. */
  expectedAmount: number;
  variable?: boolean;
  currencyCode: CurrencyCode;
  /** Dia do mês esperado. Ignorado em `ONE_OFF`. */
  expectedDay?: number;
  /** Mês esperado, 1 a 12. Só se aplica a `ANNUAL`. */
  expectedMonth?: number;
  accountId: string;
  categoryId: string;
  ownerId: string;
  visibility: Visibility;
  active: boolean;
  startedAt: string;
}

export type IncomeStatus = "RECEIVED" | "PENDING" | "LATE" | "INACTIVE";

export type DebtKind =
  | "MORTGAGE"
  | "AUTO"
  | "PERSONAL"
  | "CREDIT_CARD"
  | "INSTALMENT";

/** `PAYABLE` é dívida minha; `RECEIVABLE` é dinheiro que me devem. */
export type DebtDirection = "PAYABLE" | "RECEIVABLE";

export interface Debt {
  id: string;
  name: string;
  counterparty: string;
  kind: DebtKind;
  direction: DebtDirection;
  /** Capital inicial, em unidades mínimas. */
  principal: number;
  /** Taxa anual nominal em pontos base. 1450 = 14,50%. */
  interestBps: number;
  /** Prestação acordada, em unidades mínimas. */
  instalment: number;
  dueDay: number;
  currencyCode: CurrencyCode;
  accountId?: string;
  ownerId: string;
  visibility: Visibility;
  startedAt: string;
  sharedWith?: string[];
}

export interface DebtPayment {
  id: string;
  debtId: string;
  amount: number;
  /** A prestação divide-se em juro e amortização de capital. */
  interestPart: number;
  principalPart: number;
  paidAt: string;
}

export type DebtStatus = "ON_TRACK" | "LATE" | "SETTLED";

export interface Goal {
  id: string;
  name: string;
  description?: string;
  targetAmount: number;
  currencyCode: CurrencyCode;
  deadline?: string;
  accountId?: string;
  ownerId: string;
  assigneeIds?: string[];
  visibility: Visibility;
  sharedWith?: string[];
  icon: string;
  startedAt: string;
}

export interface GoalContribution {
  id: string;
  goalId: string;
  amount: number;
  memberId: string;
  occurredAt: string;
}

export type GoalStatus = "ACHIEVED" | "ON_TRACK" | "AT_RISK" | "OVERDUE";

export type WantPriority = "LOW" | "MEDIUM" | "HIGH";

export type WantStatus = "IDEA" | "CONVERTED" | "PURCHASED" | "DISCARDED";

export interface Want {
  id: string;
  name: string;
  note?: string;
  estimatedCost: number;
  currencyCode: CurrencyCode;
  priority: WantPriority;
  status: WantStatus;
  /** Preenchido quando o desejo foi promovido a objetivo. */
  goalId?: string;
  ownerId: string;
  visibility: Visibility;
  sharedWith?: string[];
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  /** Sempre positivo, em unidades mínimas. O sinal vem de `type`. */
  amount: number;
  currencyCode: CurrencyCode;
  amountInSpaceCurrency: number;
  description: string;
  categoryId?: string;
  accountId: string;
  counterAccountId?: string;
  incomeSourceId?: string;
  ownerId: string;
  visibility: Visibility;
  occurredAt: string;
}
