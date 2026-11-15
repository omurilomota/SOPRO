# Arquitetura

## Visão geral

SOPRO é uma **SPA offline-first**. Não há backend, autenticação ou sincronização
nesta versão. Toda a persistência acontece no IndexedDB do navegador, e a única
chamada externa é a consulta da liturgia.

```
┌──────────────────────────────────────────────────────────┐
│  React 19 + React Router 7 (rotas lazy por área)         │
│                                                          │
│  features/*  ──►  hooks/*  ──►  services/*  ──► storage  │
│      │                                          │        │
│      └──► components/ui                          ▼        │
│                                          IndexedDB       │
│  services/liturgy ──► API Dancrf (fetch + Zod)           │
└──────────────────────────────────────────────────────────┘
```

## Camadas

### `features/` — telas e regras de apresentação

Cada área tem sua página (`*Page.tsx`), seus componentes internos e, quando
precisa, uma pasta `components/`. Nenhuma feature chama `fetch` diretamente.

### `hooks/` — orquestração de dados de UI

- `useLocalCollection(repository, { sort })` — CRUD genérico sobre IndexedDB,
  com escrita antes do estado (a tela nunca mostra dado não salvo).
- `useLiturgy(date)` — ciclo de vida da liturgia: loading, erro, cache, aviso.
- `useTodayData()` — agrega compromissos, hábitos e próximas ocorrências.
- `useFavorites()`, `useCalendar()`, `useSettings()`, `useOnlineStatus()`.

### `services/` — integrações e regras de domínio

- `liturgy/` — provedor, schema Zod, normalizador, cache e orquestração.
- `storage/` — wrapper de IndexedDB (`idb.ts`), repositórios tipados,
  configurações e backup/restauração.
- `calendar/` — expansão de recorrências e exportação ICS.
- `pwa/` — registro do service worker.

### `data/` — conteúdo editorial

Orações, mistérios do Rosário, formações e, em `data/rcc/`, toda a base da área
*Vida no Espírito*: dons infusos e frutos, carismas, três momentos do grupo de
oração, elementos da reunião, nove semanas do SVES, etapas do processo
formativo, ministérios, critérios de discernimento, alertas pastorais, linha do
tempo e glossário.

Separado do código de propósito: revisar conteúdo não deveria exigir mexer em
lógica — e conteúdo doutrinal precisa de revisão. Os testes de `data/rcc`
funcionam como guardas: verificam, por exemplo, que todo carisma tem cautela
pastoral e que a distinção entre dom infuso e carisma não foi quebrada.

### Progresso do caminho carismático

`rccProgress` é uma store própria (DB v2), com uma linha por iniciativa
(`sves:8`, `formacao:mb3`). O hook `useRccProgress(kind)` expõe
`byRef`/`toggle`/`setNote`. Nada é enviado a servidor: marcar uma semana não sai
do aparelho.

### `utils/` — funções puras

Datas (regras anti-UTC documentadas), tempo litúrgico, ambiente, classes CSS.

## Decisões técnicas

### Datas como strings locais

`ISODate` (`aaaa-mm-dd`) trafega por toda a aplicação. Conversões para `Date`
usam `fromISODate()`, que fixa meio-dia local. `toISOString()` é proibido para
derivar data civil — em UTC-3, ele volta um dia.

### IndexedDB encapsulado

`createRepository<T>(store)` devolve `getAll`, `getById`, `put`, `putMany`,
`remove`, `clear`, `count`. A interface `Repository<T>` permite, no futuro,
trocar IndexedDB por um backend sem alterar features nem hooks.

### Cache de liturgia em duas camadas

`Map` em memória (24 entradas) para navegação rápida entre datas e IndexedDB
para persistência entre sessões. A camada de memória existe porque trocar de dia
repetidamente é uma interação comum.

### Recorrências calculadas, não materializadas

Eventos recorrentes guardam apenas a regra (`frequency`, `until`). As ocorrências
são expandidas por `expandEvent()` para a janela visível. Isso evita milhares de
registros e mantém a edição simples. Casos-limite tratados: `until`, dia 31 em
meses curtos, alinhamento de dia da semana.

### Ordenação por ref no hook

`useLocalCollection` guarda o comparador em `useRef`. Inline comparators criam nova
função a cada render; se entrassem nas dependências do `useEffect`, a coleção
recarregaria em loop infinito.

### PWA com estratégia mista

- Precache: shell da aplicação, fontes, ícones.
- `NetworkFirst` para a API de liturgia e para o proxy `/api/liturgia`.
- `navigateFallback: /index.html` — rotas da SPA funcionam offline.

## Modelo de dados

| Store               | Conteúdo                              | Chave  |
| ------------------- | ------------------------------------- | ------ |
| `settings`          | nome, tema, lembretes                 | `user` |
| `events`            | compromissos com recorrência          | `id`   |
| `prayerGroups`      | grupos de oração                      | `id`   |
| `habits`            | hábitos espirituais                   | `id`   |
| `habitCompletions`  | marcações (hábito + data)             | `id`   |
| `journal`           | diário espiritual                     | `id`   |
| `intentions`        | intenções                             | `id`   |
| `verses`            | versículos favoritos                  | `id`   |
| `lifePlan`          | plano de vida                         | `id`   |
| `activityLog`       | histórico local                       | `id`   |
| `favorites`         | favoritos genéricos                   | `id`   |
| `liturgyCache`      | última liturgia por data              | `id` = data |
| `rccProgress`       | semanas do SVES e módulos de formação | `id` = `kind:refId` |

Versão do banco em `src/database/schema.ts` (`DB_VERSION`, hoje `2`). Toda
evolução de esquema precisa de migração em `onupgradeneeded` — o upgrade é
aditivo e cria apenas as stores que ainda não existem, de modo que um usuário da
v1 mantém todos os dados ao abrir a v2.

## Sistema visual ("Missal")

A interface é construída como um livro litúrgico, não como um painel:

- **Estrutura por filetes e tipografia**, não por cartões. `.plate` é o único
  container com moldura e é raro.
- **Rubrica** — versalete terracota (`--color-rubric`) para rótulos estruturais;
  substitui o "eyebrow" genérico de template.
- **Serifa para leitura** (Newsreader) a 18px/1.9, sans para interface (Inter).
- **Cantos quase retos** (`--radius: 3px`), **nenhuma sombra** em conteúdo.
- **Tinta em grafite quente** (`#33302b`), nunca preto; papel com calor
  (`#faf8f4`). Tema escuro parte de `#1d1b18`, não de preto.
- **Respiro**: `.stack-loose` (1,75 rem entre blocos) e `.reading + .reading`
  substituem a repetição de `space-y-*` nas telas.
- Cores litúrgicas usadas só onde têm significado (marcadores de compromisso,
  cor da celebração).

## Acessibilidade

- Landmarks semânticos (`aside`, `main`, `nav`, `header`, `footer`), link de
  salto para o conteúdo.
- `aria-pressed` em controles de alternância, `aria-expanded` em acordeões,
  `aria-live` no contador do terço e nos toasts.
- Foco visível global (`:focus-visible` com cor de destaque).
- Modais com `role="dialog"`, `aria-modal`, fechamento por `Esc` e retorno de foco.
- `prefers-reduced-motion` desativa animações.
- Contraste conferido nos dois temas.

## Evolução prevista

1. **P1** — progresso de formações, favoritos ampliados, novenas estruturadas.
2. **P2** — backend opcional com sincronização (exige revisão de LGPD e de
   segurança), conta opcional, calendários compartilhados, notificações push.

Os contratos `LiturgyProvider` e `Repository` foram criados para que essas
evoluções não obriguem a reescrever as telas.
