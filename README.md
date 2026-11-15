# SOPRO

> Plataforma comunitária, gratuita e open-source para organizar a vida espiritual católica.

SOPRO reúne, em um único lugar e sem ruído, o que um católico precisa no dia a dia:
a liturgia do dia, a biblioteca de orações, o terço guiado, o calendário dos
compromissos religiosos e a formação.

E faz uma coisa que nenhum outro aplicativo católico faz com seriedade: trata a
**Renovação Carismática Católica** como ela é — um movimento com documentos, com
crise, com correções pastorais e com um processo formativo exigente. O Grupo de
Oração em três momentos, o Seminário de Vida no Espírito Santo semana por semana,
os carismas com as cautelas que a CNBB escreveu, o discernimento pelos critérios
de eclesialidade. Não uma lista de frases sobre o Espírito Santo.

Não é um aplicativo oficial da RCCBRASIL nem de qualquer instituição eclesial.
O projeto é independente, feito pela comunidade e para a comunidade.

---

## Índice

- [Princípios](#princípios)
- [O que já funciona](#o-que-já-funciona)
- [Tecnologias](#tecnologias)
- [Instalação e desenvolvimento](#instalação-e-desenvolvimento)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Fontes de dados e direitos](#fontes-de-dados-e-direitos)
- [Privacidade](#privacidade)
- [Testes e qualidade](#testes-e-qualidade)
- [Como contribuir](#como-contribuir)
- [Roadmap](#roadmap)
- [Licença](#licença)

---

## Princípios

| Princípio         | O que significa na prática                                                        |
| ----------------- | --------------------------------------------------------------------------------- |
| **Gratuito**      | Nenhuma funcionalidade essencial depende de pagamento. Sem paywall, sem anúncios. |
| **Open-source**   | Código público sob AGPL-3.0, contribuições da comunidade e transparência.         |
| **Comunitário**   | O projeto não é construído em torno de um negócio.                                |
| **Privacidade**   | Dados espirituais ficam no dispositivo. Sem conta, sem rastreamento.              |
| **Católico**      | Conteúdo coerente com a doutrina, a tradição e o Magistério.                      |
| **Carismático**   | Atenção especial à RCC, sem excluir os demais católicos.                          |
| **Simplicidade**  | Interface calma, hierarquia clara, nada de excesso.                                |

## O que já funciona

- **Hoje** — saudação, liturgia do dia, evangelho resumido, rotina espiritual,
  compromissos, próximo grupo de oração e atalhos.
- **Liturgia** — leituras (1ª, salmo, 2ª, evangelho), orações e antífonas,
  tempo litúrgico, cor litúrgica, navegação por data e leitura offline do último
  dia consultado.
- **Orações** — biblioteca com busca e categorias, leitura com ajuste de fonte,
  favoritos persistidos.
- **Terço** — experiência guiada com os quatro conjuntos de mistérios, contador
  discreto de Ave-Marias e modo de leitura.
- **Calendário** — compromissos com recorrência (semanal, bissemanal, mensal),
  visualização mensal e semanal, cadastro do grupo de oração, exportação `.ics`.
- **Formações** — trilhas com referências bíblicas e magisteriais, além de uma
  biblioteca que aponta para as fontes oficiais.
- **Vida no Espírito** — a área que diferencia o SOPRO, em onze seções:
  o que é a RCC (com as objeções reais da Igreja ao movimento), os três momentos
  do Grupo de Oração, a reunião de oração elemento por elemento com o erro comum
  de cada um, a trilha do SVES com progresso local, dons × carismas × frutos,
  os dezessete carismas com cuidados pastorais, o discernimento pelos cinco
  critérios de eclesialidade e pelos alertas do Documento 53 da CNBB, o mapa do
  processo formativo (MB1–MB8 + FH1–FH3), os quinze ministérios, a história de
  Elena Guerra ao CHARIS e o glossário.
- **Minha caminhada** — diário, intenções, versículos, plano de vida, hábitos e
  histórico; exportação, importação e exclusão integral dos dados.
- **PWA** — instalável, service worker, cache de recursos e fallback offline.
- **Tema claro e escuro** (claro como padrão, com opção de seguir o sistema).

## Tecnologias

- [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
- [TypeScript 5](https://www.typescriptlang.org/) (modo `strict`)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) para ícones
- [React Router 7](https://reactrouter.com/)
- [date-fns](https://date-fns.org/) com locale `pt-BR`
- [Zod](https://zod.dev/) para validar a resposta da API de liturgia
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox)
- IndexedDB nativo, encapsulado em `src/services/storage`
- [Vitest](https://vitest.dev/) + Testing Library + `fake-indexeddb`

## Instalação e desenvolvimento

Requisitos: **Node.js 20.19+ ou 22.12+** e npm.

```bash
git clone https://github.com/omurilomota/SOPRO.git
cd SOPRO
npm install
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

```bash
npm run build      # typecheck + build de produção (gera o service worker)
npm run preview    # serve o build com PWA ativo
npm run test       # testes unitários (Vitest)
npm run lint       # ESLint
npm run typecheck  # TypeScript sem erros
```

> O Service Worker só é registrado em produção (`npm run preview`). Em `npm run dev`
> o PWA fica desativado para não atrapalhar o hot reload.

## Variáveis de ambiente

Copie `.env.example` para `.env`. Apenas variáveis com prefixo `VITE_` chegam ao
navegador.

| Variável                      | Padrão                          | Descrição                                                        |
| ----------------------------- | ------------------------------- | ---------------------------------------------------------------- |
| `VITE_DONATION_URL`           | _(vazio)_                       | Link de doação. Enquanto estiver vazio, o rodapé não o exibe.     |
| `VITE_LITURGIA_API_BASE`      | `https://liturgia.up.railway.app/v2` | Base da API de liturgia. Use `/api/liturgia` para o proxy dev. |
| `VITE_LITURGIA_CACHE_TTL_HOURS` | `6`                           | Validade do cache de liturgia antes de nova tentativa de atualizar. |

## Estrutura de pastas

```
src/
  app/            # composição da aplicação: roteador e providers
  components/
    ui/           # primitivas visuais (Button, Plate, Section, Field…)
    layout/       # casca da aplicação (AppLayout, Footer, ErrorBoundary)
    navigation/   # definição e componentes de navegação
  features/
    dashboard/    # tela Hoje
    liturgy/      # liturgia diária
    prayers/      # biblioteca de orações
    rosary/       # experiência do terço (engine + UI)
    calendar/     # calendário pessoal e grupo de oração
    formations/   # trilhas e biblioteca
    charismatic/  # Vida no Espírito: RCC, carismas, SVES, discernimento
    spiritual-life/ # caminhada, diário, configurações, privacidade
  services/
    liturgy/      # integração, normalização e cache da fonte externa
    storage/      # IndexedDB, repositórios, backup
    calendar/     # recorrência e exportação ICS
    pwa/          # registro do service worker
  database/       # esquema do banco local
  hooks/          # hooks de dados e de UI
  types/          # tipos de domínio
  utils/          # datas, tempo litúrgico, ambiente, classes
  data/           # conteúdo editorial (orações, mistérios, formações)
    rcc/          # base da área carismática: dons, carismas, SVES, grupo, formação
  styles/         # tokens de design e estilos globais
  test/           # configuração de testes
```

A regra é separar **componentes visuais**, **regras de negócio**, **persistência**,
**integrações externas** e **conteúdo editorial**. Nenhuma tela fala com a API
diretamente: tudo passa por `services/liturgy`.

## Fontes de dados e direitos

- **Liturgia** — API comunitária [Dancrf/liturgia-diaria](https://github.com/Dancrf/liturgia-diaria)
  (v2, versão estável). Leia [`docs/liturgia.md`](docs/liturgia.md) para os
  detalhes de integração, limites e licenciamento.
- **Orações e mistérios** — formulações tradicionais em domínio público e sínteses
  escritas para o SOPRO. Política em [`docs/conteudo.md`](docs/conteudo.md).
- **Formações** — textos originais do SOPRO com referências verificáveis. A
  biblioteca **nunca** copia material de terceiros: guarda metadados e link para
  a fonte, com nota de licença.
- **Vida no Espírito** — sínteses próprias, construídas a partir de fontes
  públicas: CNBB Documento 53 (1994), *Christifideles Laici* 30, Documentos de
  Malinas, Catecismo (nn. 799-801, 1506-1523), *Lumen Gentium* 12, Documento de
  Aparecida e materiais de formação amplamente divulgados. As apostilas oficiais
  da RCCBRASIL **não** são reproduzidas. Ver [`docs/conteudo.md`](docs/conteudo.md).

> A licença AGPL-3.0 do código **não se estende** a conteúdos de terceiros nem a
> materiais litúrgicos.

## Privacidade

- Sem conta, sem login, sem analytics, sem cookies de rastreamento.
- Diário, intenções, hábitos e compromissos ficam no IndexedDB do navegador.
- A única chamada externa é a consulta da liturgia, que envia apenas a data.
- Exportação (JSON) e exclusão integral disponíveis em **Minha caminhada →
  Configurações**.

A página `/privacidade` dentro do app descreve item por item o que é armazenado.

## Testes e qualidade

Os testes cobrem o que é crítico:

- **datas** — conversão local sem deslocamento de UTC, validação ISO, grade mensal;
- **tempo litúrgico** — cálculo da Páscoa e das estações;
- **integração litúrgica** — validação, normalização, formas longa/breve,
  comportamento de cache e de erro;
- **persistência** — escrita, atualização, remoção, texto longo e limpeza total;
- **calendário** — expansão de recorrências, casos-limite (dia 31, `until`);
- **exportação ICS** — escape, dobra de linhas, `RRULE`.

```bash
npm run typecheck && npm run lint && npm run test && npm run build
```

## Como contribuir

Leia [`CONTRIBUTING.md`](CONTRIBUTING.md). Resumo:

1. Abra uma issue descrevendo o problema ou a proposta.
2. Crie uma branch a partir de `develop`: `feature/nome-curto` ou `fix/nome-curto`.
3. Escreva commits no padrão gitmoji + conventional commits
   (ex.: `✨ feat: adiciona filtro por categoria nas orações`).
4. Garanta `typecheck`, `lint`, `test` e `build` verdes.
5. Abra um Pull Request para `develop` descrevendo o que mudou e por quê.

## Roadmap

**P0 — MVP (entregue)**

- [x] Estrutura, navegação e interface responsiva
- [x] Tela Hoje
- [x] Integração de liturgia com cache e modo offline
- [x] Biblioteca inicial de orações
- [x] Experiência do terço
- [x] Calendário pessoal e cadastro do grupo de oração
- [x] Minha caminhada com persistência local
- [x] PWA e suporte offline
- [x] Link de doação configurável
- [x] Documentação inicial

**P1 — próxima evolução**

- [ ] Trilhas de formação com progresso
- [ ] Aprofundamento em dons e carismas
- [ ] Favoritos em todos os tipos de conteúdo
- [ ] Personalização da rotina espiritual na tela Hoje
- [ ] Novenas com datas de início e fim

**P2 — futuro**

- [ ] Sincronização entre dispositivos (com revisão de LGPD)
- [ ] Conta opcional
- [ ] Calendários compartilhados de grupos
- [ ] Contribuição editorial comunitária
- [ ] Notificações push (respeitando permissões do navegador)

## Licença

Código sob **GNU AGPL-3.0-or-later** — veja [`LICENSE`](LICENSE).

Conteúdos de terceiros, traduções bíblicas e textos litúrgicos **não** herdam essa
licença: cada um permanece com seus titulares. O SOPRO indica as fontes e não
redistribui esses materiais.
