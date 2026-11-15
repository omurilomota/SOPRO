# Integração de liturgia

Documento de referência sobre a fonte externa de liturgia, o que foi investigado,
o que foi decidido e quais são as limitações conhecidas.

## 1. Fonte escolhida

**API comunitária [`Dancrf/liturgia-diaria`](https://github.com/Dancrf/liturgia-diaria)**

- Repositório: <https://github.com/Dancrf/liturgia-diaria>
- Endpoint público: `https://liturgia.up.railway.app`
- Versão usada: **v2** (estável, release `v2.0`)
- Documentação: [`docs/v2/README.md`](https://github.com/Dancrf/liturgia-diaria/blob/main/docs/v2/README.md)
- Versão em testes no momento da integração: v3 (`https://liturgia.up.railway.app/v3/`),
  que introduz múltiplas celebrações por dia e leituras como array ordenado.

### Por que a v2

A v2 é a versão declarada estável na documentação do projeto, com formato de
resposta estável e cobertura ampla. A v3 estava em *release candidate* quando a
integração foi escrita. O modelo de dados normalizado do SOPRO já contempla
múltiplas celebrações (`celebrations: LiturgyCelebration[]`), de modo que a
migração para a v3 não exigirá mudanças no frontend — apenas um novo normalizador
em `src/services/liturgy/normalize.ts`.

## 2. Endpoints utilizados

```http
GET {base}/?dia={dd}&mes={mm}&ano={aaaa}
```

| Parâmetro | Obrigatório | Observação                                              |
| --------- | ----------- | ------------------------------------------------------- |
| `dia`     | sim         | dia do mês                                              |
| `mes`     | não         | padrão: mês atual                                       |
| `ano`     | não         | padrão: ano atual                                       |

O SOPRO **sempre envia os três parâmetros** e compara a data devolvida em
`data` (formato `dd/mm/aaaa`) com a data pedida. Isso evita exibir a liturgia de
outro dia caso a fonte use cache interno ou fuso diferente.

Endpoints não utilizados:

- `?periodo=7` — limite de 7 dias e o período sempre parte da data atual do
  servidor; consultar uma data por vez mantém o cache previsível.
- `/{dia}-{mes}` — equivalente ao query string, sem vantagem para o SOPRO.

Resposta de erro da fonte:

```json
{ "erro": "Não encontramos nenhuma liturgia para esta data", "data": "01/02/2080" }
```

Status `404`. O SOPRO trata isso como `not-found` — nunca como sucesso vazio.

## 3. Fluxo da integração

```
UI (useLiturgy)
   ↓
services/liturgy/index.ts        ← orquestra cache + rede
   ├─ cache.ts                   ← IndexedDB (store `liturgyCache`) + cache em memória
   └─ provider-dancrf.ts         ← fetch + timeout + tratamento de status
        ├─ schema.ts             ← validação com Zod
        └─ normalize.ts          ← conversão para o modelo do SOPRO
```

Regras:

1. **Cache primeiro** para leitura offline imediata.
2. Se o cache está fresco (padrão: 6 h), devolve o cache e não faz requisição.
3. Se está vencido, tenta rede; em caso de sucesso, atualiza o cache.
4. Se a rede falha e existe cache, devolve o cache com `staleError` — e a UI mostra
   um aviso honesto, não finge que está atualizado.
5. Se não há cache nem rede, o erro é propagado com mensagem específica.
6. **Nenhum dado fictício** é apresentado como liturgia real em nenhum caminho.

### O contrato do provedor

```ts
interface LiturgyProvider {
  readonly id: string;
  readonly name: string;
  readonly homepage: string | null;
  fetchByDate(date: ISODate): Promise<Liturgy>;
}
```

Trocar a fonte é implementar essa interface e chamar `setLiturgyProvider()`. Um
provedor baseado em backend próprio, ou em importação manual de arquivo, encaixa
sem tocar em nenhuma tela.

## 4. Datas: o ponto mais sensível

- A fonte devolve `data` como `dd/mm/aaaa` na hora local do servidor.
- `parseProviderDate()` converte **string para string**, sem passar por `Date` nem
  por UTC. `15/11/2026` → `2026-11-15`, sempre.
- O frontend trabalha apenas com `ISODate` (`aaaa-mm-dd`) e converte para `Date`
  com `fromISODate()`, que usa meio-dia local — imune a efeitos de DST.
- **Nunca** usamos `toISOString()` para derivar a data civil: em UTC-3 isso
  "voltaria um dia".

## 5. CORS e desenvolvimento local

O endpoint público da API não documenta explicitamente cabeçalhos CORS. Para
desenvolvimento, o `vite.config.ts` inclui um proxy opcional:

```bash
# .env
VITE_LITURGIA_API_BASE=/api/liturgia
```

O proxy reescreve `/api/liturgia/*` para `https://liturgia.up.railway.app/v2/*`,
eliminando a negociação de CORS no navegador.

Em produção, há três caminhos:

1. a API responder com CORS habilitado — funciona direto;
2. usar o proxy do próprio host de deploy (Netlify/Vercel/Cloudflare) para o
   mesmo caminho `/api/liturgia`;
3. escrever um provedor alternativo apontando para um backend próprio — o
   contrato já existe.

O Service Worker também mantém cache `NetworkFirst` das respostas da API, o que
garante o funcionamento offline dos dias já consultados.

## 6. Licenciamento e direitos

Investigação realizada no momento da integração:

| Item                            | Situação                                                                 |
| ------------------------------- | ------------------------------------------------------------------------ |
| Licença do código da API        | O repositório **não declara** arquivo de licença (`license: null` na API do GitHub). |
| Termos de uso do endpoint       | Não há termos publicados no repositório.                                  |
| Licença dos textos litúrgicos   | Textos litúrgicos e traduções bíblicas têm titulares próprios; não são de domínio público. |
| Redistribuição pela API         | Não há autorização explícita documentada para redistribuir os dados.      |

**Decisão do SOPRO:**

- Consumimos a API apenas para **exibir ao usuário**, com atribuição visível da
  fonte e link para o repositório do projeto.
- O SOPRO **não redistribui** os textos: não os empacota em bundle, não os
  exporta em backup, não os serve a terceiros. O cache local existe para uso
  pessoal e offline do próprio usuário, como cache de navegador.
- Os textos não recebem a licença AGPL-3.0 do SOPRO.
- O cache de liturgia é local ao dispositivo e não entra na exportação de dados
  pessoais.
- A UI informa que, em caso de divergência, prevalece o Missal Romano.

**Pendência aberta (registrada, não inventada):** antes de qualquer uso que
implique redistribuição — como um backend do SOPRO que sirva liturgia a vários
usuários, ou uma exportação de liturgia — é necessário contato com o mantenedor
da API e/ou substituição por fonte com licença compatível. Enquanto isso não
ocorrer, o consumo permanece no modelo "exibição com atribuição".

## 7. Limitações conhecidas

1. **Cobertura da fonte** — datas sem liturgia publicada retornam 404. O SOPRO
   mostra "Liturgia não publicada" e não preenche nada.
2. **Disponibilidade** — o endpoint é um serviço comunitário em Railway; pode
   ficar indisponível. O app continua utilizável e explica o ocorrido.
3. **Sem santo do dia estruturado** — a v2 não devolve o santo do dia como campo
   próprio. O SOPRO não inventa essa informação: exibe apenas o que a fonte
   fornece no título da celebração.
4. **Tempo litúrgico** — calculado localmente a partir da Páscoa
   (`src/utils/liturgical-seasons.ts`). É um cálculo determinístico e documentado,
   não um dado da fonte. Pode divergir em casos particulares (por exemplo,
   solenidades transferidas por decisão da conferência episcopal).
5. **Cores litúrgicas desconhecidas** — quando a fonte devolve um valor não
   mapeado, exibimos "Cor não informada" em vez de adivinhar.

## 8. Testes da integração

`src/services/liturgy/normalize.test.ts` e `service.test.ts` cobrem:

- conversão de `dd/mm/aaaa` sem deslocamento de UTC;
- rejeição de datas impossíveis (`31/02/2026`);
- mapeamento de cores e ausência de cor;
- normalização da resposta real da API (fixture capturado do endpoint);
- formas longa e breve como opções da mesma leitura;
- leituras sem texto descartadas em vez de preenchidas com conteúdo fictício;
- validação de campos mínimos;
- cache fresco, cache vencido com falha de rede, ausência total de dados.

## 9. Como trocar de fonte

1. Crie `src/services/liturgy/provider-x.ts` implementando `LiturgyProvider`.
2. Valide a resposta com Zod em `schema.ts` (novo schema, se necessário).
3. Normalize para `Liturgy` em `normalize.ts`.
4. Registre com `setLiturgyProvider(new ProviderX())` em `services/liturgy/index.ts`.
5. Rode os testes de integração e atualize este documento.
