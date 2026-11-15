# Política editorial de conteúdo

O SOPRO só publica o que pode publicar com segurança jurídica e fidelidade
doutrinal. Este documento descreve as regras aplicadas aos textos do aplicativo.

## 1. Classificação do conteúdo

| Tipo                         | Origem                                             | Licença                              |
| ---------------------------- | -------------------------------------------------- | ------------------------------------ |
| Orações tradicionais         | Formulações seculares da Igreja (Pai-Nosso, Ave-Maria, Credo, Salve-Rainha, Veni Sancte Spiritus…) | Domínio público |
| Textos bíblicos citados      | Referências e passagens curtas já consagradas       | Citação, com referência              |
| Sínteses doutrinais          | Escritas para o SOPRO                               | AGPL-3.0 (código do projeto)         |
| Meditações do Rosário        | Escritas para o SOPRO                               | AGPL-3.0                             |
| Liturgia diária              | API externa Dancrf                                  | Exibição com atribuição (ver `liturgia.md`) |
| Biblioteca de formações      | Metadados + link para a fonte                       | Do titular original                 |

## 2. O que o SOPRO **não** faz

- Não reproduz homilias, pregações, livros, apostilas ou subsídios de editoras.
- Não copia traduções bíblicas protegidas por direitos autorais.
- Não reproduz materiais da RCCBRASIL ou de outras instituições sem autorização.
- Não embute vídeos, áudios ou PDFs de terceiros.
- Não inventa dados litúrgicos quando a fonte falha.

## 3. Como adicionar uma oração

1. Confirme que o texto é de domínio público ou escrito originalmente para o
   SOPRO.
2. Adicione o objeto em `src/data/prayers.ts` com:
   - `attribution` honesta (ex.: "fórmula tradicional", "formulação própria do SOPRO");
   - `scripture` com as referências bíblicas realmente relacionadas;
   - `suggestedMoment` coerente.
3. Se for redação própria, escreva em português claro e evite linguagem
   devocional exagerada.
4. Revise a ortografia e o uso de maiúsculas nos nomes divinos.

## 4. Como adicionar uma formação

As trilhas em `src/data/formations.ts` seguem a estrutura:

- `summary` — síntese própria, de 2 a 4 frases;
- `scripture` — referências verificáveis;
- `magisterium` — Catecismo (CIC), documentos conciliares, papais ou
  congregacionais, sempre citáveis por número/parágrafo;
- `practice` — uma ou duas ações concretas e possíveis.

Nunca colar texto de um documento da Igreja sem citar a fonte e verificar a
permissão de reprodução. Paráfrase com referência é sempre preferível.

## 5. Cuidado doutrinal na área carismática

Ponto de atenção específico do projeto:

- **Dons do Espírito (Is 11, 2-3)**, **carismas (1Cor 12)** e **frutos (Gl 5, 22-23)**
  são três categorias distintas, apresentadas como tais na página *Dons e carismas*.
  Exemplos que costumam ser confundidos: *sabedoria* (dom) ≠ *palavra de sabedoria*
  (carisma); *ciência* (dom) ≠ *palavra de ciência* (carisma); *fé* (virtude
  teologal) ≠ *fé* (carisma).
- **Não há testes de dons.** A plataforma não oferece questionário, perfil ou
  diagnóstico. O progresso registrado na área é de *percurso* (semanas do SVES,
  módulos do Módulo Básico), nunca de identificação de carisma.
- **Nada de promessas de cura.** Os dons de cura são apresentados como graça, não
  como técnica ou resultado garantido, e sempre com o encaminhamento a
  acompanhamento médico quando pertinente.
- **Discernimento é comunitário.** Todo texto reforça a necessidade de direção
  espiritual, comunhão com a paróquia e submissão à Igreja. A página
  *Discernimento* lista os cinco critérios de eclesialidade (ChL 30) e os alertas
  do Doc. 53 da CNBB.
- **Cautelas obrigatórias** derivadas do Documento 53: nada de "repouso no
  Espírito" apresentado como experiência normal (n. 66); nada de óleo ou gestos
  que imitem sacramentos na oração pelos doentes (nn. 60-61); o juízo sobre os
  carismas pertence aos pastores (nn. 57-58); não reaproveitar termos eclesiais
  com outro sentido (n. 29).
- **Não somos a RCCBRASIL.** A independência institucional é declarada no rodapé,
  no README e nas páginas da área carismática.
- **Sem URL inventada.** Só se referencia documento cuja localização pública é
  conhecida; os demais ficam como referência bibliográfica, sem link.

## 6. Revisão

Antes de abrir um PR com conteúdo novo, verifique:

- [ ] A fonte está identificada e permite o uso?
- [ ] Não há texto de terceiros colado sem permissão?
- [ ] As referências bíblicas e magisteriais estão corretas?
- [ ] O tom é pastoral, sóbrio e não sensacionalista?
- [ ] Nenhuma categoria teológica foi misturada?
- [ ] Nenhuma cautela pastoral do Doc. 53 foi contrariada?
- [ ] O teste `src/data/rcc/rcc-content.test.ts` continua passando?

Em caso de dúvida jurídica ou doutrinal, registre a questão em uma issue em vez de
decidir sozinho — o projeto prefere a lacuna documentada ao erro silencioso.
