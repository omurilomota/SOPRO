# Como contribuir com o SOPRO

Obrigado pelo interesse. Este projeto existe para servir à comunidade católica e é
mantido por contribuições voluntárias.

Antes de escrever código, leia [`docs/conteudo.md`](docs/conteudo.md): há regras
claras sobre direitos autorais e cuidado doutrinal — elas não são negociáveis.

## Código de conduta

- Trate as pessoas com respeito, inclusive em discordâncias técnicas.
- Não use o projeto como plataforma para posições partidárias ou polêmicas
  religiosas alheias à fé católica.
- Críticas são bem-vindas; julgamentos sobre a vida espiritual de outros
  contribuidores, não.
- Conteúdo que desrespeite a doutrina católica ou que apresente dados fictícios
  como reais será recusado.

## Fluxo de trabalho (Gitflow)

```
main        ← versões estáveis (tags)
develop     ← integração contínua
feature/*   ← novas funcionalidades
fix/*       ← correções
docs/*      ← documentação
chore/*     ← tarefas internas
```

1. Faça fork e clone do repositório.
2. Atualize `develop` e crie sua branch a partir dele:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/filtro-categorias-oracoes
   ```

3. Desenvolva, testando localmente.
4. Commit no padrão **gitmoji + conventional commits** (veja abaixo).
5. Envie a branch e abra um Pull Request **para `develop`**.

Prefixos de branch aceitos: `feature/`, `fix/`, `docs/`, `chore/`, `refactor/`,
`test/`, `perf/`.

## Padrão de commits (gitmoji + conventional)

Formato:

```
<emoji> <tipo>(<escopo opcional>): <descrição no imperativo, em minúsculas>
```

Exemplos:

```
✨ feat(oracoes): adiciona filtro por categoria
🐛 fix(calendario): corrige recorrência mensal em meses curtos
📝 docs(liturgia): documenta limitação de CORS
♿️ a11y(terco): melhora rótulos do contador de Ave-Marias
💄 style(ui): ajusta espaçamento do cabeçalho no mobile
✅ test(datas): cobre virada de ano no fuso local
♻️ refactor(storage): extrai repositório genérico
⚡️ perf(liturgia): evita requisição repetida com cache em memória
🔧 chore(deps): atualiza vite para 7.3
🚸 ux(hoje): melhora estado vazio dos compromissos
🥅 fix(liturgia): trata erro 404 como ausência de dados
🔒️ fix(storage): remove cache de liturgia do backup exportado
```

Tipos usados: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`,
`a11y`, `ux`.

**Regras de commit:**

- Uma alteração lógica por commit.
- Descrição no imperativo ("adiciona", não "adicionei").
- Sem ponto final na primeira linha.
- Mudanças de conteúdo editorial e de código, preferencialmente, em commits
  separados.
- Não commitar `node_modules`, `dist`, `.env` nem dados pessoais.

## Padrões de código

- **TypeScript strict**, sem `any` injustificado. Prefira `unknown` + validação.
- Componentes pequenos. Se um arquivo passa de ~250 linhas, provavelmente cabe
  dividir.
- Separação obrigatória: visual (`features/*/components`), lógica (`hooks`,
  `services`), persistência (`services/storage`), conteúdo (`data/`).
- Nenhuma tela chama `fetch` diretamente — use `services/`.
- Nunca use `toISOString()` para derivar data civil; use `utils/date.ts`.
- Estilos com Tailwind, usando os tokens do tema (não hex solto).
- Estados de carregamento, vazio e erro são obrigatórios em toda tela que lê dados.
- Textos voltados ao usuário em português do Brasil.

### Checklist antes de abrir o PR

```bash
npm run typecheck   # zero erros
npm run lint        # zero erros
npm run test        # tudo verde
npm run build       # build de produção funciona
```

Rode também o app (`npm run dev`) e verifique:

- [ ] A tela funciona em celular (360px) e desktop.
- [ ] O tema escuro está legível.
- [ ] Os dados persistem após recarregar a página.
- [ ] Não há rota quebrada.
- [ ] Os estados de erro/vazio fazem sentido.

## O que esperamos no Pull Request

- Título no mesmo padrão dos commits.
- Descrição com: **o que mudou**, **por quê** e **como testar**.
- Capturas de tela para mudanças visuais (mobile e desktop).
- Issues relacionadas referenciadas (`Closes #12`).
- Para conteúdo novo: a fonte e a situação de licença, respondendo ao checklist de
  [`docs/conteudo.md`](docs/conteudo.md#6-revisão).

## Áreas onde ajuda é muito bem-vinda

- Novas orações em domínio público, com verificação de fonte.
- Revisão de português e de terminologia litúrgica.
- Trilhas de formação (P1) com referências magisteriais corretas.
- Testes adicionais para recorrências e datas em fusos diferentes.
- Acessibilidade: testes com leitores de tela.
- Traduções (o app é pt-BR; um dia, i18n).

## Dúvidas jurídicas ou doutrinais

Não resolva sozinho. Abra uma issue descrevendo o caso. O projeto prefere
**documentar uma limitação** a publicar algo duvidoso.

## Licença das contribuições

Ao contribuir, você concorda que sua contribuição será licenciada sob
**AGPL-3.0-or-later**, a mesma licença do projeto. Conteúdos de terceiros
permanecem com seus titulares e não podem ser adicionados sem permissão.
