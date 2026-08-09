# Luma

O sistema operativo da tua vida financeira e administrativa. Sozinho ou em
conjunto, sem perder privacidade.

O produto e o modelo de dados estão descritos em [`PRD.md`](./PRD.md). A versão
original, escrita para o Lovable, ficou arquivada em
[`docs/prd-v0-lovable.md`](./docs/prd-v0-lovable.md).

## Estado atual

Esta é a **camada visual da Fase 0/1**: todos os ecrãs do MVP existem e navegam,
alimentados por dados de demonstração em memória (`src/lib/mock.ts`). Ainda não
há base de dados, autenticação nem Server Actions.

O que já existe:

| Área            | Rotas                                                             |
| --------------- | ----------------------------------------------------------------- |
| Público         | `/`                                                                |
| Autenticação    | `/auth/login`, `/register`, `/forgot-password`, `/verify-email`, `/accept-invite` |
| Onboarding      | `/onboarding`                                                      |
| Aplicação       | `/app`, `/app/accounts`, `/app/accounts/[id]`, `/app/income`, `/app/transactions` |
| Planeamento     | `/app/goals`, `/app/wants`, `/app/debts`                           |
| Espaço          | `/app/members`, `/app/notifications`                               |
| Definições      | `/app/settings/{profile,security,preferences,space}`               |

## Stack

- **Next.js 16** (App Router, React Server Components, Turbopack)
- **Tailwind CSS v4** + **shadcn/ui** (base Radix, preset Nova)
- **next-themes** para o tema claro/escuro
- **Recharts** para gráficos
- **Bun** como gestor de pacotes

Prisma, MySQL e better-auth entram na fase seguinte, conforme o PRD.

## Desenvolvimento

```bash
bun install
bun run dev
```

A app fica em [http://localhost:3000](http://localhost:3000).

```bash
bun run lint    # ESLint
bun run build   # build de produção + verificação de tipos
```

## Convenções

- Todo o código vive em `src/`. O alias `@/*` aponta para `src/*`.
- **O dinheiro circula sempre em unidades mínimas inteiras** (cêntimos). A
  formatação passa por `src/lib/money.ts`; nunca fazer aritmética monetária com
  vírgula flutuante.
- A visibilidade de cada recurso (`PRIVATE`, `SPACE`, `CUSTOM`) é filtrada na
  camada de dados, não na UI. Os dados mock já seguem esta regra, para que a
  substituição pela Data Access Layer não mude os componentes.
- **Previsão e realidade são coisas distintas.** `IncomeSource` diz o que se
  espera receber, `Goal` o que se quer juntar e `Want` o que se gostava de ter;
  só a `Transaction` associada mexe em saldos e agregados. Uma fonte pode estar
  em atraso, ou um objetivo em risco, sem que nenhum saldo mude.
- **Valores derivados não se guardam.** O saldo devedor de uma dívida vem do
  plano de amortização e o poupado de um objetivo vem das contribuições. Se
  fossem campos editáveis, deixariam de bater certo com o histórico.
- Componentes de UI gerados pelo shadcn ficam em `src/components/ui/` e não
  devem ser editados sem motivo; o resto de `src/components/` é código do
  produto.
