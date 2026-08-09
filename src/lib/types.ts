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
  ownerId: string;
  visibility: Visibility;
  occurredAt: string;
}
