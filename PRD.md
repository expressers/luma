# Luma — Product Requirements Document

> **Versão:** 1.0 · **Stack:** Next.js 16 (App Router) · Prisma · MySQL · better-auth · shadcn/ui · Tailwind v4
>
> Este documento substitui o briefing original escrito para o Lovable.dev, arquivado em [`docs/prd-v0-lovable.md`](docs/prd-v0-lovable.md). O documento anterior descrevia o produto; este descreve o produto **e** como o construir na stack escolhida.

---

## 1. Visão

O Luma é um **Life OS**: centraliza recursos, compromissos, património, documentos e objetivos de uma pessoa ou família num único ecossistema. Não é um app de orçamento — é o sistema de registo da vida financeira e administrativa de um agregado.

**Posicionamento:** *"Organiza a tua vida, sozinho ou em conjunto."*

**Regra de ouro do produto:** *partilhar não significa perder privacidade.* Estar no mesmo Space nunca expõe automaticamente os recursos de um membro. Esta é a característica que define o produto e é a restrição de engenharia mais importante do documento.

### 1.1 Modelo de domínio

```
User ──► Membership (role) ──► Space ──► Resource (owner + visibility)
                                  ▲
                            GuestAccess (fora do Space, âmbito de 1 recurso)
```

| Conceito | Definição |
| :--- | :--- |
| **User** | Conta autenticada. Recebe um Personal Space automático no registo. |
| **Space** | Ambiente de colaboração. Tipos: `PERSONAL`, `FAMILY`, `HOUSEHOLD`, `BUSINESS`. |
| **Membership** | Vínculo User↔Space com papel: `owner`, `admin`, `member`, `child`. |
| **Resource** | Qualquer entidade de domínio, sempre com `spaceId`, `ownerUserId` e `visibility`. |
| **GuestAccess** | Acesso externo a **um** recurso específico, com expiração. O Guest **não** é membro. |

**Visibilidade de um recurso:** `PRIVATE` (só o dono e owners/admins conforme a matriz), `SPACE` (todos os membros), `CUSTOM` (lista explícita em `ResourcePermission`).

### 1.2 O que este produto não é (v1)

Não é um agregador bancário (sem Open Banking / sincronização automática), não é software de contabilidade, não é uma app de investimentos com cotações em tempo real, e não substitui um cofre de palavras-passe.

---

## 2. Escopo e faseamento

O documento original descrevia 18 módulos como se fossem uma entrega única. São um roadmap. O faseamento abaixo é vinculativo: **nada da Fase 2 começa antes da Fase 1 estar fechada.**

### Fase 0 — Fundações *(âmbito atual)*

Autenticação, Spaces, membros, convites, camada de autorização, design system, shell aplicacional.

### Fase 1 — Núcleo financeiro *(âmbito atual)*

Contas financeiras, transações (rendimentos e despesas como transações), categorias, transferências entre contas, dashboard mínimo.

### Fase 2 — Património e planeamento

Dívidas, ativos, objetivos com contribuições, desejos, recorrências, cálculo de património líquido.

### Fase 3 — Colaboração avançada

Visibilidade `CUSTOM`, Guest Access, documentos com URLs assinadas, log de auditoria exposto na UI, notificações.

### Fase 4 — Comercial e inteligência

Landing page, pricing, subscrições, Life Insights (IA), cartões de crédito.

**Definição de pronto para as Fases 0+1:** um utilizador regista-se, cria um Space familiar, convida o cônjuge, ambos registam contas e transações, cada um controla o que o outro vê, e os saldos e o dashboard estão corretos. Isto é um produto utilizável.

---

## 3. Arquitetura técnica

### 3.1 Stack

| Camada | Escolha | Notas |
| :--- | :--- | :--- |
| Framework | Next.js 16, App Router, TypeScript | Já instalado (16.3.0, React 19.2) |
| UI | shadcn/ui + Tailwind CSS v4 | Tailwind v4 já instalado; sem `tailwind.config.js`, tokens em CSS |
| ORM | Prisma | Cliente gerado para `node_modules/.prisma` |
| BD | MySQL 8 | Ver restrições em 3.4 |
| Auth | better-auth + plugin `organization` | Ver 3.3 |
| Validação | Zod, partilhada entre form e servidor | |
| Ficheiros | S3-compatível (R2 ou S3) com URLs assinadas | Fase 3 |
| Jobs | Cron do host + fila | Fase 2 (recorrências, notificações) |

### 3.2 Regra de ouro da arquitetura: Data Access Layer

A documentação do Next 16 é explícita: **o Proxy não é uma solução de autorização.** Toda a autorização vive numa Data Access Layer.

- Todo o acesso ao Prisma acontece em `src/data/**`, com `import 'server-only'` no topo de cada módulo.
- Nenhum Server Component, Server Action ou Route Handler importa `db` diretamente.
- A DAL devolve **DTOs**, nunca registos do Prisma. Um `FinancialAccount` completo nunca atravessa a fronteira servidor→cliente.
- `proxy.ts` (o antigo middleware, renomeado no Next 16) faz apenas redirects otimistas: sem cookie de sessão → `/auth/login`. Nunca decide permissões.
- Cada Server Action revalida autenticação **e** autorização, mesmo que a página já o tenha feito. Server Actions são endpoints POST independentes.
- Dados financeiros são sempre por-pedido e privados: nada de cache partilhada em rotas autenticadas.

```
src/
  app/                    rotas, layouts, páginas (finas)
  data/                   DAL — único sítio que toca no Prisma
    auth.ts               getSession, getActiveSpace (com cache() do React)
    accounts.ts           listAccounts, createAccount, ...
    transactions.ts
  lib/
    authz/                motor de permissões (ver secção 4)
    money/                Decimal, formatação, conversão
    validation/           esquemas Zod
  components/ui/          shadcn
  components/             componentes de domínio
prisma/schema.prisma
proxy.ts
```

### 3.3 Autenticação com better-auth

O plugin `organization` mapeia quase 1:1 para o domínio, o que evita construir de raiz convites, papéis e troca de contexto:

| Domínio Luma | better-auth |
| :--- | :--- |
| Space | `organization` (com campos extra `type` e `currencyCode`) |
| Membership | `member` (campo `role`) |
| Convite de membro | `invitation` + `sendInvitationEmail` |
| Space ativo | `activeOrganizationId` na sessão |
| Papéis | `createAccessControl` com roles customizadas |

Papéis: os roles nativos são `owner`, `admin`, `member`; acrescentamos `child` via `ac.newRole()`. **`guest` não é um role de membro** — um Guest não tem linha em `member`, apenas em `GuestAccess`.

Configuração exigida: e-mail + palavra-passe, OAuth Google e Apple, verificação de e-mail obrigatória, recuperação de palavra-passe, e 2FA (Fase 3). No registo, cria-se automaticamente o Personal Space e define-se como ativo.

**Colisão de nomes a resolver:** o better-auth já define um modelo `Account` (contas OAuth). O modelo financeiro chama-se **`FinancialAccount`**.

### 3.4 MySQL: restrições assumidas

MySQL foi mantido por decisão de produto. Implicações a respeitar:

- **Dinheiro é `Decimal @db.Decimal(18, 4)`.** Nunca `Float`. O default do Prisma em MySQL é `DECIMAL(65,30)`, portanto o `@db.Decimal` é obrigatório em todos os campos monetários.
- `Json` é suportado (MySQL 5.7+), portanto `ActivityLog.metadata` é `Json`, não uma string.
- Enums são nativos.
- Sem índices parciais nem `WHERE` em índices: filtros como "não arquivado" resolvem-se com colunas indexadas explícitas.
- Strings indexadas ficam em `VARCHAR(191)` (default do Prisma) por causa do limite de bytes em `utf8mb4`. Campos longos usam `@db.Text` e não são indexados.
- Collation default é case-insensitive, o que dá unicidade de e-mail sem normalização — mas normalizamos para minúsculas na escrita à mesma.
- Se o host for PlanetScale, decidir explicitamente entre foreign keys nativas ou `relationMode = "prisma"`. As duas opções mudam o schema.

---

## 4. Autorização e privacidade

Esta é a secção mais importante do documento. O PRD original delegava autorização à camada visual; isso é esconder botões, não autorizar.

### 4.1 Matriz de permissões

| Ação | Owner | Admin | Member | Child | Guest |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Eliminar Space / transferir ownership | Sim | Não | Não | Não | Não |
| Convidar e gerir membros | Sim | Sim | Não | Não | Não |
| Criar/editar recursos próprios | Sim | Sim | Sim | Sim (limitado) | Não |
| Ver recursos `SPACE` de outros | Sim | Sim | Sim | Não | Não |
| Ver recursos `PRIVATE` de outros | Não | Não | Não | Não | Não |
| Ver rendimentos e dívidas de adultos | Conforme visibilidade | Conforme visibilidade | Conforme visibilidade | Bloqueado | Bloqueado |
| Ver objetivos atribuídos a si | Sim | Sim | Sim | Sim | Não |
| Aceder a um recurso específico | — | — | — | — | Sim, com expiração |

**Nota crítica sobre `PRIVATE`:** um Owner **não** vê os recursos privados dos outros membros. Se o Owner pudesse, a promessa do produto desaparecia. O Owner controla o Space, não os dados pessoais dos membros. O que o Owner pode fazer é eliminar o Space, e isso tem de exigir confirmação explícita e um período de graça.

### 4.2 Motor de decisão

Uma única função, usada por **todos** os acessos a dados:

```ts
can(actor: Actor, action: Action, resource: ResourceRef): boolean
```

Sequência de avaliação, com a primeira regra a decidir:

1. O ator é um Guest? → só passa se existir `GuestAccess` ativo, não revogado, não expirado, para exatamente este `(resourceType, resourceId)`, com permissão suficiente. Caso contrário, nega.
2. O recurso pertence ao Space ativo do ator? Se não, nega.
3. O ator é o `ownerUserId` do recurso? Permite.
4. O ator tem papel `child` e o recurso é de tipo financeiro sensível de outro membro? Nega.
5. Visibilidade `SPACE` e o ator é membro? Permite leitura; escrita conforme papel.
6. Visibilidade `CUSTOM`? Consulta `ResourcePermission`.
7. Nega por omissão.

Duas regras de implementação inegociáveis: **nega por omissão**, e **`spaceId` é injetado pela DAL a partir da sessão** — nunca vem de parâmetro de rota, corpo do pedido ou query string.

### 4.3 Isolamento do Guest

Um Guest autenticado que navegue para qualquer rota fora do recurso autorizado é redirecionado para esse recurso. Não vê dashboard, lista de membros, nem qualquer agregado. Todo o acesso de Guest é registado no `ActivityLog`.

### 4.4 Auditoria

Toda a criação, edição, eliminação, concessão e revogação de acesso escreve em `ActivityLog`, na mesma transação de base de dados que a operação. O log é imutável e não é editável por nenhum papel.

---

## 5. Modelo de dados

### 5.1 Correções face ao schema original

O schema do documento anterior não compilava. Registo do que mudou e porquê:

| Problema | Resolução |
| :--- | :--- |
| Sete modelos referenciados e nunca definidos (`Card`, `Income`, `Expense`, `Asset`, `Want`, `Document`, `ResourcePermission`) | Definidos ou movidos para fase posterior |
| `Float` para valores monetários | `Decimal(18,4)` |
| Sem ledger: saldos sem transações que os expliquem | Modelo `Transaction` como fonte de verdade; saldo é derivado |
| `Income` e `Expense` como entidades separadas e desligadas das contas | Unificados em `Transaction` com `type` |
| `ownerId` como string solta, sem relação | Relação real `ownerUser` com FK |
| `GuestAccess` polimórfico sem `resourceType` | Campo adicionado |
| Multi-moeda sem taxas de câmbio | `ExchangeRate` + valor convertido persistido na transação |
| `metadata String? // JSON string` | `Json` |
| `type` e `status` como `String` | Enums |
| Sem índices, sem `@updatedAt` consistente, sem soft delete | Adicionados |
| Colisão com o `Account` do better-auth | Renomeado para `FinancialAccount` |

### 5.2 Schema — Fases 0 e 1

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ─── Enums ────────────────────────────────────────────────

enum SpaceType {
  PERSONAL
  FAMILY
  HOUSEHOLD
  BUSINESS
}

enum Visibility {
  PRIVATE
  SPACE
  CUSTOM
}

enum FinancialAccountType {
  BANK
  CASH
  SAVINGS
  DIGITAL_WALLET
  JOINT
}

enum TransactionType {
  INCOME
  EXPENSE
  TRANSFER
}

enum PermissionLevel {
  READ
  WRITE
}

enum ResourceType {
  FINANCIAL_ACCOUNT
  TRANSACTION
  DEBT
  ASSET
  GOAL
  WANT
  DOCUMENT
}

// ─── Auth (gerido pelo better-auth) ───────────────────────
// User, Session, Account, Verification, Organization, Member e Invitation
// são gerados por `better-auth generate`.
//
// Organization é estendida via `additionalFields` na config do plugin:
//   type         SpaceType  @default(PERSONAL)
//   currencyCode String     @default("AOA")
// Member.role aceita: owner | admin | member | child
//
// As relações inversas dos modelos de domínio (User.financialAccounts,
// Organization.transactions, etc.) têm de ser acrescentadas manualmente a
// estes modelos, porque o Prisma exige ambos os lados de cada relação. O
// `better-auth generate` preserva campos adicionais, mas isto deve ser
// verificado a cada atualização da biblioteca.

// ─── Domínio ──────────────────────────────────────────────

model FinancialAccount {
  id             String               @id @default(cuid())
  spaceId        String
  ownerUserId    String
  name           String
  institution    String?
  type           FinancialAccountType
  currencyCode   String               @db.Char(3)
  openingBalance Decimal              @db.Decimal(18, 4) @default(0)
  currentBalance Decimal              @db.Decimal(18, 4) @default(0)
  visibility     Visibility           @default(PRIVATE)
  archivedAt     DateTime?
  createdAt      DateTime             @default(now())
  updatedAt      DateTime             @updatedAt

  space        Organization  @relation(fields: [spaceId], references: [id], onDelete: Cascade)
  ownerUser    User          @relation("AccountOwner", fields: [ownerUserId], references: [id], onDelete: Restrict)
  transactions Transaction[] @relation("AccountTransactions")
  transfersIn  Transaction[] @relation("CounterAccountTransactions")

  @@index([spaceId, archivedAt])
  @@index([spaceId, ownerUserId])
  @@index([spaceId, visibility])
}

model Category {
  id       String          @id @default(cuid())
  spaceId  String?         // null = categoria de sistema
  name     String
  slug     String
  kind     TransactionType
  icon     String?
  color    String?         @db.Char(7)

  space        Organization? @relation(fields: [spaceId], references: [id], onDelete: Cascade)
  transactions Transaction[]

  @@unique([spaceId, slug])
  @@index([spaceId, kind])
}

model Transaction {
  id               String          @id @default(cuid())
  spaceId          String
  ownerUserId      String
  createdByUserId  String
  accountId        String
  counterAccountId String?         // preenchido apenas em TRANSFER
  categoryId       String?
  type             TransactionType
  // Sempre positivo. O sinal é dado por `type`.
  amount           Decimal         @db.Decimal(18, 4)
  currencyCode     String          @db.Char(3)
  // Valor convertido para a moeda do Space, congelado na data da transação,
  // para que agregados históricos não mudem quando a taxa muda.
  amountInSpaceCurrency Decimal    @db.Decimal(18, 4)
  exchangeRate     Decimal         @db.Decimal(18, 8) @default(1)
  description      String?         @db.Text
  occurredAt       DateTime
  visibility       Visibility      @default(PRIVATE)
  deletedAt        DateTime?
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt

  space          Organization      @relation(fields: [spaceId], references: [id], onDelete: Cascade)
  ownerUser      User              @relation("TransactionOwner", fields: [ownerUserId], references: [id], onDelete: Restrict)
  createdBy      User              @relation("TransactionCreator", fields: [createdByUserId], references: [id], onDelete: Restrict)
  account        FinancialAccount  @relation("AccountTransactions", fields: [accountId], references: [id], onDelete: Restrict)
  counterAccount FinancialAccount? @relation("CounterAccountTransactions", fields: [counterAccountId], references: [id], onDelete: Restrict)
  category       Category?         @relation(fields: [categoryId], references: [id], onDelete: SetNull)

  @@index([spaceId, occurredAt])
  @@index([spaceId, ownerUserId, occurredAt])
  @@index([accountId, occurredAt])
  @@index([spaceId, type, occurredAt])
  @@index([spaceId, visibility])
}

model ResourcePermission {
  id            String          @id @default(cuid())
  spaceId       String
  resourceType  ResourceType
  resourceId    String
  userId        String
  permission    PermissionLevel @default(READ)
  grantedByUserId String
  createdAt     DateTime        @default(now())

  space     Organization @relation(fields: [spaceId], references: [id], onDelete: Cascade)
  user      User         @relation("PermissionGrantee", fields: [userId], references: [id], onDelete: Cascade)
  grantedBy User         @relation("PermissionGranter", fields: [grantedByUserId], references: [id], onDelete: Restrict)

  @@unique([resourceType, resourceId, userId])
  @@index([spaceId, userId])
}

model GuestAccess {
  id           String          @id @default(cuid())
  spaceId      String
  resourceType ResourceType
  resourceId   String
  guestUserId  String
  permission   PermissionLevel @default(READ)
  expiresAt    DateTime?
  revokedAt    DateTime?
  invitedByUserId String
  createdAt    DateTime        @default(now())

  space     Organization @relation(fields: [spaceId], references: [id], onDelete: Cascade)
  guestUser User         @relation("GuestAccessGrantee", fields: [guestUserId], references: [id], onDelete: Cascade)
  invitedBy User         @relation("GuestAccessInviter", fields: [invitedByUserId], references: [id], onDelete: Restrict)

  @@index([guestUserId, revokedAt])
  @@index([resourceType, resourceId])
  @@index([spaceId])
}

model ExchangeRate {
  id           String   @id @default(cuid())
  baseCurrency String   @db.Char(3)
  quoteCurrency String  @db.Char(3)
  rate         Decimal  @db.Decimal(18, 8)
  asOf         DateTime
  source       String

  @@unique([baseCurrency, quoteCurrency, asOf])
  @@index([baseCurrency, quoteCurrency, asOf])
}

model ActivityLog {
  id           String   @id @default(cuid())
  spaceId      String
  actorUserId  String
  action       String   // RESOURCE_CREATED, ACCESS_GRANTED, ACCESS_REVOKED, ...
  resourceType ResourceType
  resourceId   String
  metadata     Json?
  ipAddress    String?
  createdAt    DateTime @default(now())

  space Organization @relation(fields: [spaceId], references: [id], onDelete: Cascade)
  actor User         @relation("ActivityActor", fields: [actorUserId], references: [id], onDelete: Restrict)

  @@index([spaceId, createdAt])
  @@index([spaceId, resourceType, resourceId])
  @@index([actorUserId, createdAt])
}
```

### 5.3 Modelos das fases seguintes

Fase 2 acrescenta `Debt` (com `DebtPayment`), `Asset` (com `AssetValuation` para acompanhar valor ao longo do tempo), `Goal` (com `GoalContribution`), `Want` e `RecurrenceRule`. Fase 3 acrescenta `Document`, `DocumentShareLink` e `Notification`. Fase 4 acrescenta `Subscription`, `Plan` e `AiConversation`. Todos seguem as mesmas convenções: `spaceId`, `ownerUserId`, `visibility`, `Decimal(18,4)` para dinheiro, soft delete e índices em `(spaceId, ...)`.

### 5.4 Regras de negócio sobre dinheiro

- **Saldo é derivado.** `currentBalance` é uma denormalização atualizada na mesma transação de base de dados que escreve a `Transaction`. Existe um comando de reconciliação que recalcula a partir de `openingBalance` mais o somatório das transações e que deve ser executável a qualquer momento sem alterar nada.
- **Transferências não são rendimento nem despesa.** Ficam excluídas de todos os agregados de receitas e gastos.
- **Conversão cambial é congelada** no momento do registo, em `amountInSpaceCurrency`. Um relatório de Janeiro não pode mudar porque a taxa mudou em Março.
- **Eliminação é sempre soft delete** em transações, para preservar auditoria.
- **Toda a aritmética monetária usa `Decimal`** de ponta a ponta, incluindo no cliente. Nunca `number`.

---

## 6. Rotas e ecrãs — Fases 0 e 1

| Rota | Ecrã | Conteúdo |
| :--- | :--- | :--- |
| `/auth/login` | Login | E-mail/palavra-passe, Google, Apple |
| `/auth/register` | Registo | Nome, e-mail, força da palavra-passe, aceitação de termos |
| `/auth/verify-email` | Verificação | Confirmação e reenvio |
| `/auth/forgot-password`, `/auth/reset-password` | Recuperação | |
| `/auth/accept-invite` | Aceitar convite | Aceitação de convite para Space |
| `/onboarding` | Wizard, 3 passos na v1 | Perfil e moeda → Space inicial → Primeira conta. Os passos de rendimento e objetivo do PRD original passam para a Fase 2 |
| `/app` | Dashboard | Saldo total, entradas e saídas do mês, últimas transações, contas |
| `/app/accounts` | Contas | Lista com badges de visibilidade, filtros, criação e edição |
| `/app/accounts/[id]` | Detalhe de conta | Saldo, extrato de transações, reconciliação |
| `/app/transactions` | Transações | Tabela filtrável por período, tipo, categoria, conta e membro |
| `/app/members` | Membros | Lista, papéis, convites, remoção |
| `/app/settings/profile` | Perfil | Nome, foto, país, moeda, fuso horário |
| `/app/settings/security` | Segurança | Palavra-passe, sessões ativas |
| `/app/settings/space` | Space | Nome, tipo, moeda, eliminação |

Rotas públicas (`/`, `/pricing`, `/security`, `/about`, legais) ficam para a Fase 4, exceto uma landing mínima.

### 6.1 Estados obrigatórios

Cada ecrã com dados tem de definir os quatro estados: vazio (com ação de arranque), carregamento (skeleton), erro (com recuperação) e sem permissão. O estado "sem permissão" nunca revela a existência do recurso.

---

## 7. Design system

O ponto de partida é o do documento original, tokenizado para shadcn/ui sobre Tailwind v4 (tokens em CSS via `@theme`, sem `tailwind.config.js`).

| Elemento | Light | Dark |
| :--- | :--- | :--- |
| Fundo | `slate-50` | `slate-950` |
| Superfícies | `white` | `slate-800` |
| Bordas | `slate-200` | `slate-700` |
| Texto principal | `slate-900` | `slate-50` |
| Texto secundário | `slate-500` | `slate-400` |
| Primária | `blue-600` | `blue-500` |
| Positivo | `emerald-600` | `emerald-500` |
| Negativo | `red-600` | `red-500` |

Referências de linguagem visual: Linear, Notion, Raycast. Sidebar retrátil, topbar com breadcrumb, Space Switcher, pesquisa, notificações, seletor de tema e avatar. Dark e light com `next-themes`, respeitando a preferência do sistema, sem flash na hidratação.

**Badges de visibilidade** são um componente central e devem ser consistentes em toda a aplicação: `PRIVATE` âmbar, `SPACE` azul, `CUSTOM` roxo.

Valores monetários usam tabular numerals e alinhamento à direita. Nunca se mostra um valor sem a respetiva moeda.

---

## 8. Requisitos não funcionais

**Segurança.** Autorização exclusivamente no servidor, na DAL. Todos os inputs validados com Zod dentro da Server Action, não apenas no formulário. Rate limiting em login, registo, recuperação de palavra-passe e convites. Content Security Policy definida. Sem dados sensíveis de cartões (nunca número completo nem CVV).

**Privacidade e conformidade.** Exportação completa de dados do utilizador em JSON. Eliminação de conta com período de graça e remoção efetiva. Retenção do `ActivityLog` definida e documentada. Aviso de cookies apenas se houver analytics.

**Desempenho.** Dashboard abaixo de 1s em p75 com 5.000 transações. Todas as queries com índice — nenhuma listagem sem paginação.

**Internacionalização.** Português como língua base, arquitetura preparada para inglês. Moedas suportadas na v1: AOA, EUR, USD, BRL. Formatação com `Intl`, respeitando a localização do utilizador.

**Acessibilidade.** Navegação completa por teclado, foco visível, contraste AA nos dois temas.

**Testes.** Testes unitários obrigatórios para o motor de permissões e para a aritmética monetária — são as duas zonas onde um erro é caro. Testes end-to-end para os fluxos de registo, convite e criação de transação.

---

## 9. Decisões em aberto

1. **Nome.** O repositório é `luma`, o documento original dizia "Life Manager". Este documento assume Luma. Confirmar antes de haver marca na UI.
2. **Faturação em Angola.** O Stripe não suporta empresas sediadas em Angola. Se o mercado-alvo primário for Angola, a Fase 4 precisa de uma alternativa (Multicaixa Express, EMIS, ou entidade noutra jurisdição). Isto afeta o modelo de dados de subscrições, portanto é melhor decidir cedo.
3. **Fronteira de privacidade da IA.** O produto posiciona-se em privacidade e a Fase 4 propõe enviar dados financeiros para um LLM. Definir: provider, se recursos `PRIVATE` de outros membros são excluídos do contexto (devem ser), retenção do lado do provider, e consentimento explícito por Space.
4. **Host de MySQL.** PlanetScale, Railway, Aiven ou RDS. Determina se usamos foreign keys nativas.
5. **Papel `child`.** Falta definir a idade mínima e as implicações legais de menores com conta própria. Alternativa a considerar: o perfil de criança não ter conta autenticada na v1.
6. **Recorrências.** Gerar transações futuras antecipadamente ou calculá-las na leitura. Afeta o modelo da Fase 2.

---

## 10. Sequência de implementação — Fases 0 e 1

1. Prisma e MySQL: schema base, primeira migração, cliente e seeds de categorias de sistema.
2. better-auth com plugin `organization`: e-mail/palavra-passe, OAuth, verificação, criação automática do Personal Space.
3. `lib/authz`: motor `can()`, com testes unitários antes de existir UI que dependa dele.
4. DAL: `data/auth.ts` com `getSession` e `getActiveSpace` em `cache()`, `server-only` em todo o lado.
5. shadcn/ui, tokens de tema, `next-themes`, shell aplicacional com sidebar, topbar e Space Switcher.
6. Autenticação e onboarding, ponta a ponta.
7. Membros e convites.
8. Contas financeiras: CRUD, visibilidade, arquivo.
9. Transações: CRUD, categorias, transferências, atualização e reconciliação de saldos.
10. Dashboard e agregados.
11. `ActivityLog` ligado a todas as mutações.
12. Testes end-to-end dos fluxos críticos e passagem de segurança usando a checklist de auditoria da documentação do Next.
