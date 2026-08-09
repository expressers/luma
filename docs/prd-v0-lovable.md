# **LIFE MANAGER — Master PRD & Briefing Completo para Lovable AI**

---

**Instruções de Execução no [Lovable.dev](http://Lovable.dev):** Este documento foi desenhado para ser fornecido como Master Prompt & Guia de Arquitetura Visual/Funcional no Lovable. O Lovable deve implementar a aplicação completa com suporte nativo a **Dark Mode / Light Mode (design system tokenizado)**, renderizando todas as telas públicas, páginas de autenticação, fluxos de onboarding, dashboards e todos os 18 módulos funcionais do Life OS.

## **1\. Visão Geral & Filosofia de Produto**

---

**Life Manager** não é apenas uma aplicação de finanças ou orçamento pessoal. É um **Life OS (Sistema Operativo de Vida)** que centraliza e organiza recursos, compromissos, responsabilidades, património, documentos e objetivos de uma pessoa ou família num único ecossistema seguro e inteligente.

**Slogan / Posicionamento:** *"Organiza a tua vida, sozinho ou em conjunto."* / *"A tua vida. As tuas pessoas. O teu espaço."*

### **Conceito Fundamental de Domínio:**

`USER ──► SPACE ──► MEMBERSHIP (Role + Permissions) ──► RESOURCE (Owner + Visibility)`

* **USER:** Conta individual autenticada. Cada utilizador tem o seu próprio espaço privado automático (Personal Space).  

* **SPACE:** Ambiente de colaboração. Tipos: *Personal*, *Family*, *Household* e *Business*. Um utilizador pode alternar livremente entre múltiplos Spaces.  

* **MEMBERSHIP:** Vínculo entre User e Space com atribuição de papéis (Owner, Admin, Member, Child, Guest).  

* **RESOURCE:** Qualquer entidade do sistema (Contas, Cartões, Dívidas, Receitas, Despesas, Ativos, Objetivos, Desejos, Documentos).  

* **VISIBILITY & PRIVACY:** Regra de ouro: *Partilhar não significa perder privacidade.* Estar no mesmo Space não expõe automaticamente todos os recursos. Níveis de visibilidade: PRIVATE, SPACE, CUSTOM.

## **2\. Especificações de UI/UX, Design System & Temas (Dark & Light)**

---

A interface deve transmitir clareza, controlo, segurança e alta maturidade financeira. Evitar o aspeto de bancos tradicionais ou tabelas de Excel genéricas. A aplicação deve parecer um **OS moderno (semelhante ao Linear, Notion ou Raycast)**.

### **2.1 Sistema de Cores e Tokens CSS (Tailwind)**

| Elemento UI | Light Mode Token / Cor | Dark Mode Token / Cor   |

| :---- | :---- | :---- |

| **Background Principal** | \#F8FAFC (slate-50) | \#090D16 / \#0F172A (slate-950/900) |

| **Cards & Superfícies** | \#FFFFFF (white) | \#1E293B (slate-800) |

| **Bordas e Divisores** | \#E2E8F0 (slate-200) | \#334155 (slate-700) |

| **Texto Principal** | \#0F172A (slate-900) | \#F8FAFC (slate-50) |

| **Texto Secundário** | \#64748B (slate-500) | \#94A3B8 (slate-400) |

| **Cor Primária (Accent)** | \#2563EB (blue-600) | \#3B82F6 (blue-500) |

| **Sucesso / Rendimentos** | \#16A34A (emerald-600) | \#22C55E (emerald-500) |

| **Alerta / Despesas / Dívidas** | \#DC2626 (red-600) | \#EF4444 (red-500) |

### **2.2 Diretrizes Visuais Gerais**

* **Theme Toggle:** Botão global visível no Topbar/Header para comutar instantaneamente entre Light e Dark mode (com suporte a system default).  

* **Layout Base:** Sidebar navegável à esquerda (retrátil em ecrãs pequenos) \+ Topbar com Breadcrumb, Space Switcher, Pesquisa Global, Notificações, Theme Switcher e Perfil de Utilizador.  

* **Tipografia e Spacing:** Fonte principal Arial ou Inter/Sans. Espaçamento confortável (line-height: 1.25 ou 1.5), padding generoso nos cartões e tabelas.  

* **Componentes Visuais:** Progress bars animadas para Objetivos, Badges coloridas para Visibilidade (PRIVATE: Âmbar/Dourado, SPACE: Azul, CUSTOM: Roxo), Cartões de Crédito realistas estilizados com gradiente, modais limpos com backdrop blur.

## **3\. Arquitetura de Rotas e Telas Desenvolvidas (Lovable Prompts)**

---

O Lovable deve criar e renderizar todas as páginas enumeradas abaixo, mantendo layout responsivo desktop-first e total coerência entre Light e Dark theme.

### **3.1 Páginas Públicas (Landing Page & Informações)**

 */ —* *Landing Page Principal:** Hero section com CTA ("Organiza a tua vida hoje"), secção de problema/solução, comparação Personal vs. Family vs. Household, grade de funcionalidades, depoimentos, tabela de preços e footer completo.  

 */pricing —* *Pricing:** Planos Free, Family Pro, Household Premium e Business Enterprise com alternador mensal/anual e matriz de comparação detalhada.  

 */security —* *Segurança & Privacidade:** Explicação da arquitetura de permissões, criptografia end-to-end em trânsito/repouso, links temporários de documentos e isolamento de dados no servidor.  

* /about, /contact, /terms, /privacy, /cookies — Telas institucionais e de suporte legal.

### **3.2 Páginas de Autenticação e Onboarding**

* /auth/login — Formulário de login com e-mail/palavra-passe, botões social login (Google/Apple) e botão de alternância de tema.  

* /auth/register — Registo de utilizador com nome, e-mail, verificação de força da palavra-passe e aceitação de termos.  

* /auth/forgot-password & /auth/reset-password — Fluxo de recuperação de palavra-passe.  

* /auth/verify-email — Tela de confirmação e ativação da conta.  

* /auth/accept-invite — Tela dedicada para aceitação de convites de Space ou recurso Guest.  

 */onboarding —* *Onboarding Wizard em 5 Passos:**  

  1. Definição do Perfil (Nome, Fotografia, País, Moeda Principal \- ex: Kz, EUR, USD, BRL).  

  2. Escolha do Espaço Inicial (Personal ou Criar/Entrar em Família).  

  3. Registo do Primeiro Rendimento / Salário.  

  4. Adição da Primeira Conta Bancária / Carteira.  

  5. Definição do Primeiro Objetivo / Sonho de Poupança.

### **3.3 Telas da Aplicação (App Core & Módulos)**

| Rota | Nome da Página | Componentes & Layout Exigidos   |

| :---- | :---- | :---- |

| /app/dashboard | Dashboard Inteligente | Space Switcher no topo. Widgets de Saldo Total, Rendimentos Mensais, Despesas Mensais, Total em Dívidas, Ativos Totais, Progresso de Objetivos, Próximas Contas a Vencer e Painel **Life Insights (IA)**. Contextualiza dinamicamente se o Space ativo for Personal ou Family. |

| /app/accounts | Contas Financeiras | Lista/Grid de contas (Banco, Dinheiro, Poupança, Carteira Digital, Conta Conjunta). Botão "Nova Conta", badges de visibilidade e filtros por tipo. |

| /app/cards | Cartões de Débito/Crédito | Visualização em estilo "Digital Wallet" com cartões estilizados. Mostra limite disponível, fatura atual, data de fecho e vencimento. Sem dados sensíveis (CVV/Número completo). |

| /app/income | Rendimentos & Receitas | Tabela de receitas com frequência (Única, Mensal, Anual), fonte, data e atribuição de membro responsável. |

| /app/expenses | Despesas & Gastos | Painel de gastos categorizados (Alimentação, Habitação, Saúde, Transporte, etc.). Suporte a despesas recorrentes, anexos de recibos e filtros de visibilidade. |

| /app/debts | Dívidas & Passivos | Gestão de empréstimos, créditos e financiamentos. Exibe valor inicial, saldo devedor, taxa de juro, prestação mensal e barra de progresso de amortização. |

| /app/assets | Património & Ativos | Mapeamento de bens (Imóveis, Veículos, Equipamentos, Investimentos) com valor estimado atual para cálculo de Net Worth (Património Líquido). |

| /app/goals | Objetivos Financeiros | Grid de metas (ex: Fundo de Emergência, Compra de Casa). Barras de progresso em %, valor acumulado vs. alvo, data limite e botão de "Adicionar Contribuição". |

| /app/wants | Desejos & Aspiracional | Lista de desejos (ex: Computador Novo, Viagem). Sistema de prioridade e botão para *"Convert into Goal"* (Converter em Objetivo). |

| /app/documents | Documentos & Cofre | Cofre de ficheiros (Contratos, Seguros, Recibos). Pré-visualização, indicação de data de expiração/validade, download e gerador de URLs temporárias. |

| /app/members | Gestão de Membros | Lista de membros do Space com papéis (Owner, Admin, Member, Child). Modal para "Convidar Novo Membro" por e-mail e gestão de permissões. |

| /app/guests | Acessos Guest Excepcionais | Gestão de permissões temporárias concedidas a utilizadores externos para recursos específicos (ex: Seguro Partilhado), com data de expiração e revogação imediata. |

| /app/activity | Log de Atividade & Auditoria | Histórico completo de alterações (quem criou, editou, partilhou ou revogou acessos dentro do Space) para total transparência e segurança. |

| /app/insights | Life Insights & Assistente IA | Interface de conversa e recomendações financeiras/pessoais com base em dados autorizados (ex: "Análise das despesas do mês", "Previsão de poupança"). |

| /app/notifications | Central de Notificações | Lista de alertas de faturas vincendas, documentos prestes a expirar, convites recebidos e alterações de segurança. |

| /app/settings/\* | Configurações Globais | Sub-páginas: /profile, /security (mudar password, MFA), /preferences (moeda, idioma, tema), /space (configurações do espaço atual) e /permissions. |

## **4\. Regras de Permissão, Papéis & Acesso Guest**

---

A segurança é tratada como funcionalidade core. O Lovable deve aplicar rigorosamente a validação de autorização em todas as interações e componentes visualizados.

### **4.1 Matriz de Permissões por Role**

| Ação / Permissão | Owner | Admin | Member | Child | Guest   |

| :---- | :---- | :---- | :---- | :---- | :---- |

| **Eliminar Space / Transferir Ownership** | Sim | Não | Não | Não | Não |

| **Convidar & Gerir Membros** | Sim | Sim | Não | Não | Não |

| **Criar / Editar Recursos Partilhados** | Sim | Sim | Sim | Não | Não |

| **Ver Rendimentos / Dívidas dos Pais** | Sim | Sim | Conforme Visibilidade | **Bloqueado** | **Bloqueado** |

| **Aceder a Objetivos & Poupança Atribuída** | Sim | Sim | Sim | **Sim** | Não |

| **Acesso Apenas a Recurso Específico** | N/A | N/A | N/A | N/A | **Sim (Com Expiração)** |

### **4.2 Isolamento Estrito do Papel Guest**

1. O Guest NÃO é membro do Space. Não vê o Dashboard completo, não vê a lista de membros e não acede às finanças gerais.  

2. O Guest acede estritamente a 1 ou N recursos atribuídos via entidade GuestAccess (com campos: resource\_id, permission, expires\_at).  

3. Qualquer tentativa de navegação lateral por parte de um Guest deve redirecionar para a tela de visualização do recurso autorizado.

## **5\. Modelo de Dados & Estrutura Técnica Prisma (Schema)**

---

Abaixo encontra-se a representação em esquema Prisma / MySQL recomendada para guiar a estrutura do backend e dos estados do Lovable:

`datasource db {`  

  `provider = "mysql"`  

  `url      = env("DATABASE_URL")`  

`}`

`generator client {`  

  `provider = "prisma-client-js"`  

`}`

`enum SpaceType {`  

  `PERSONAL`  

  `FAMILY`  

  `HOUSEHOLD`  

  `BUSINESS`  

`}`

`enum RoleType {`  

  `OWNER`  

  `ADMIN`  

  `MEMBER`  

  `CHILD`  

  `GUEST`  

`}`

`enum VisibilityType {`  

  `PRIVATE`  

  `SPACE`  

  `CUSTOM`  

`}`

`model User {`  

  `id            String         @id @default(uuid())`  

  `name          String`  

  `email         String         @unique`  

  `passwordHash  String`  

  `avatarUrl     String?`  

  `country       String         @default("AO")`  

  `currency      String         @default("AOA")`  

  `timezone      String         @default("Africa/Luanda")`  

  `createdAt     DateTime       @default(now())`  

  `updatedAt     DateTime       @updatedAt`

  `memberships   SpaceMember[]`  

  `resources     ResourcePermission[]`  

  `guestAccesses GuestAccess[]`  

  `activities    ActivityLog[]`  

`}`

`model Space {`  

  `id          String        @id @default(uuid())`  

  `name        String`  

  `type        SpaceType     @default(PERSONAL)`  

  `currency    String        @default("AOA")`  

  `createdAt   DateTime      @default(now())`  

  `updatedAt   DateTime      @updatedAt`

  `members     SpaceMember[]`  

  `accounts    Account[]`  

  `cards       Card[]`  

  `incomes     Income[]`  

  `expenses    Expense[]`  

  `debts       Debt[]`  

  `assets      Asset[]`  

  `goals       Goal[]`  

  `wants       Want[]`  

  `documents   Document[]`  

  `activities  ActivityLog[]`  

`}`

`model SpaceMember {`  

  `id        String   @id @default(uuid())`  

  `spaceId   String`  

  `userId    String`  

  `role      RoleType @default(MEMBER)`  

  `createdAt DateTime @default(now())`

  `space     Space    @relation(fields: [spaceId], references: [id], onDelete: Cascade)`  

  `user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)`

  `@@unique([spaceId, userId])`  

`}`

`model Account {`  

  `id          String         @id @default(uuid())`  

  `spaceId     String`  

  `ownerId     String`  

  `name        String`  

  `institution String`  

  `type        String         // BANK, CASH, SAVINGS, DIGITAL_WALLET`  

  `currency    String         @default("AOA")`  

  `balance     Float          @default(0.0)`  

  `visibility  VisibilityType @default(PRIVATE)`  

  `createdAt   DateTime       @default(now())`

  `space       Space          @relation(fields: [spaceId], references: [id])`  

`}`

`model Debt {`  

  `id              String         @id @default(uuid())`  

  `spaceId         String`  

  `ownerId         String`  

  `name            String`  

  `creditor        String`  

  `initialAmount   Float`  

  `remainingAmount Float`  

  `interestRate    Float?`  

  `dueDate         DateTime?`  

  `visibility      VisibilityType @default(PRIVATE)`  

  `status          String         @default("ACTIVE") // ACTIVE, PAID, OVERDUE`

  `space           Space          @relation(fields: [spaceId], references: [id])`  

`}`

`model Goal {`  

  `id           String         @id @default(uuid())`  

  `spaceId      String`  

  `ownerId      String`  

  `name         String`  

  `targetAmount Float`  

  `currentAmount Float         @default(0.0)`  

  `deadline     DateTime?`  

  `visibility   VisibilityType @default(SPACE)`  

  `status       String         @default("ACTIVE")`

  `space        Space          @relation(fields: [spaceId], references: [id])`  

`}`

`model GuestAccess {`  

  `id          String    @id @default(uuid())`  

  `spaceId     String`  

  `resourceId  String`  

  `guestUserId String`  

  `permission  String    @default("READ") // READ, WRITE`  

  `expiresAt   DateTime?`  

  `createdAt   DateTime  @default(now())`  

  `revokedAt   DateTime?`

  `space       Space     @relation(fields: [spaceId], references: [id])`  

  `guestUser   User      @relation(fields: [guestUserId], references: [id])`  

`}`

`model ActivityLog {`  

  `id           String   @id @default(uuid())`  

  `spaceId      String`  

  `actorId      String`  

  `action       String   // e.g., RESOURCE_CREATED, ACCESS_GRANTED`  

  `resourceType String`  

  `resourceId   String`  

  `metadata     String?  // JSON string`  

  `createdAt    DateTime @default(now())`

  `space        Space    @relation(fields: [spaceId], references: [id])`  

  `actor        User     @relation(fields: [actorId], references: [id])`  

`}`

## **6\. Roteiro de Prompting Passo a Passo para o Lovable**

---

Para garantir que o Lovable desenvolva toda a aplicação sem interrupções e com a máxima precisão, execute os prompts na seguinte sequência:

### **Passo 1: Setup do Design System & Suporte Dual-Theme (Dark/Light)**

*Prompt Lovable:* "Cria o Design System base do **Life Manager** usando Tailwind CSS e Shadcn UI. Configura suporte completo a Dark Mode e Light Mode com alternador visível no Header. Utiliza cores slate-900/slate-950 para Dark Mode e slate-50/white para Light Mode, com tom primário Blue-600/Blue-500. Cria o layout base com Sidebar retrátil, Header superior com Space Switcher, Pesquisa Global, Central de Notificações, Selector de Tema e Avatar de Perfil."

### **Passo 2: Criação das Páginas Públicas & Autenticação**

*Prompt Lovable:* "Desenvolve todas as páginas públicas e de autenticação: / (Landing page com Hero, Problema, Solução, Personal vs Family, Pricing e FAQ), /pricing, /security, /about, /contact, /auth/login, /auth/register, /auth/forgot-password, /auth/accept-invite e o assistente de onboarding em 5 passos /onboarding. Garanta total responsividade e alternância perfeita entre Dark e Light Mode."

### **Passo 3: Módulos Financeiros (Accounts, Cards, Income, Expenses, Debts, Assets)**

*Prompt Lovable:* "Desenvolve os ecrãs e módulos financeiros da aplicação: /app/accounts, /app/cards (com visualização de carteira de cartões digitais), /app/income, /app/expenses, /app/debts (com progresso de amortização de dívidas) e /app/assets. Adiciona seletores de visibilidade (PRIVATE, SPACE, CUSTOM), formulários modais de criação/edição, empty states informativos e indicadores de filtro."

### **Passo 4: Planeamento, Documentos, Gestão de Membros & Guest Access**

*Prompt Lovable:* "Constrói os módulos de planeamento e colaboração: /app/goals (com barras de progresso), /app/wants (com botão de conversão para Goal), /app/documents (cofre de ficheiros com tags de expiração), /app/members (gestão de papéis Owner, Admin, Member, Child), /app/guests (gestão de acessos temporários para utilizadores externos com expiração) e /app/activity (log de auditoria do Space)."

### **Passo 5: Dashboards Inteligentes & IA Insights**

*Prompt Lovable:* "Desenvolve o /app/dashboard contextual ao Space selecionado (exibindo KPIs financeiros, gráficos de receitas/despesas, progresso de objetivos e alertas) e a página /app/insights com o assistente de IA Life OS que responde a perguntas sobre os dados autorizados do utilizador. Adiciona suporte final de validação para todos os componentes em Light e Dark Mode."